import React from 'react'
import { getWeight } from './global-weight'

type GameState = 'not playing' | 'playing' | 'ended'

type GameComponentState = {
  currentState: GameState
}

type GameProps = {
  children: (props: {
    state: GameState
    timePassed: number
    startGame: () => void
  }) => JSX.Element | null
}

const COOLOFF_TIME = 500

export default class Game extends React.Component<
  GameProps,
  GameComponentState
> {
  state: GameComponentState = { currentState: 'not playing' }

  lastTimeReadingChanged = 0
  lastReading = 0
  timer = -1
  startTime = 0

  stop() {
    clearInterval(this.timer)
  }

  startGame() {
    const watchValve = () => {
      const readingFromScale = getWeight()

      if (this.state.currentState === 'not playing' && readingFromScale > 0.2) {
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
      startGame: () => this.startGame()
    })
  }
}
