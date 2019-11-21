import React from 'react'
import { round } from '../../utils/math-utils'
import Page, { Header, Footer, Handle, Nozzle, Cup, Main } from '../Common/Page'
import Score from '../Score/Score'
import { Scale } from '../../Scale'
import { cupFullness } from '../../utils/cup-utils'

const TIMER_START_THRESHOLD = 0.2
const COOLOFF_TIME = 500

type PlyaingProps = {
  scale: Scale
  onEnded: (weight: number, timePassed: number) => void
}

type PlyaingState = {
  weight: number
  timePassed: number
}

export default class Playing extends React.Component<
  PlyaingProps,
  PlyaingState
> {
  state = { weight: 0, timePassed: 0 }
  startedTiemr: number | null = null
  lastReading = 0
  lastTimeReadingChanged = -1

  componentDidMount() {
    this.props.scale.onWeightChange = this.setWeigth
  }

  setWeigth = (weight: number) => {
    this.setState({ weight })
    if (weight > TIMER_START_THRESHOLD && !this.startedTiemr) {
      this.startTimer()
    }
  }

  startTimer() {
    const timerStartedAt = Date.now()
    this.startedTiemr = setInterval(() => {
      this.setState({ timePassed: (Date.now() - timerStartedAt) / 1000 })
      this.watchValve()
    }, 100)
  }

  watchValve() {
    if (!this.startedTiemr) {
      return
    }

    if (this.lastReading !== this.state.weight) {
      this.lastTimeReadingChanged = Date.now()
      this.lastReading = this.state.weight
    } else if (Date.now() - this.lastTimeReadingChanged >= COOLOFF_TIME) {
      this.stopTimer()
      this.props.onEnded(this.state.weight, this.state.timePassed)
    }
  }

  stopTimer() {
    if (this.startedTiemr) clearInterval(this.startedTiemr)
  }

  render() {
    const { weight, timePassed } = this.state

    return (
      <Page>
        <Header>Täydellinen uutto</Header>
        <Main>
          <Handle />
          <Nozzle on={this.state.timePassed > 0} />
          <Cup amount={cupFullness(this.state.weight)} />
        </Main>
        <Footer>
          <div>
            Weight: <strong>{round(weight, 1)}g</strong>
          </div>
          <div>Time: {round(timePassed, 1)}s</div>
          <div>
            Score: <Score timePassed={timePassed} weight={weight} />
            /1000
          </div>
        </Footer>
      </Page>
    )
  }
}
