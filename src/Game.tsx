import React from 'react'

type GameState =
  | 'not playing'
  | 'waiting for valve to open'
  | 'playing'
  | 'ended'

type GameComponentState = {
  currentState: GameState
  scaleConnected: false
}

type GameProps = {
  children: (props: {
    state: GameState
    timePassed: number
    scaleConnected: boolean
    startGame: () => void
  }) => JSX.Element | null
}

const COOLOFF_TIME = 500

export default class Game extends React.Component<
  GameProps,
  GameComponentState
> {
  state: GameComponentState = { currentState: 'not playing', scaleConnected: false }

  lastTimeReadingChanged = 0
  lastReading = 0
  timer = -1
  startTime = 0

  stop() {
    clearInterval(this.timer)
  }

  startGame() {
    this.setState({ currentState: 'waiting for valve to open' })

    const watchValve = () => {
      const readingFromScale = getWeight()

      if (
        this.state.currentState === 'waiting for valve to open' &&
        readingFromScale > 0.2
      ) {
        this.setState({ currentState: 'playing' })
        this.startTime = Date.now()
      }

      if (this.state.currentState === 'playing') {
        if (this.lastReading !== readingFromScale) {
          this.lastTimeReadingChanged = Date.now()
          this.lastReading = readingFromScale
        } else if (Date.now() - this.lastTimeReadingChanged >= COOLOFF_TIME) {
          this.state.currentState = 'ended'
          this.stop()
        }
      }

      this.forceUpdate()
    }
    this.timer = setInterval(watchValve, 100)
  }

  render() {
    return this.props.children({
      state: this.state.currentState,
      timePassed: this.startTime ? (Date.now() - this.startTime) / 1000 : 0,
      scaleConnected: this.state.scaleConnected,
      startGame: () => this.startGame()
    })
  }
}
