import React, { useState, useEffect } from 'react'
import Page, { Header, Footer, Handle, Nozzle, Cup, Main } from '../Common/Page'
import Score, { score } from '../Score/Score'
import { cupFullness } from '../../utils/cup-utils'
import { round } from '../../utils/math-utils'
import styled from 'styled-components'
import Button from '../Common/Button'

const GameOverModal = styled.dialog`
  border-radius: 1em;
  background: #ff6600;
  color: #fff;
  border-color: transparent;
  border-bottom-color: rgba(0, 0, 0, 0.2);
  border-top-color: rgba(255, 255, 255, 0.1);
  width: 22em;
  max-width: 90vw;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2), 0 3px 8px rgba(0, 0, 0, 0.4);
  transition: opacity 0.6s cubic-bezier(0.42, 0.97, 0.52, 1.49),
    transform 0.6s cubic-bezier(0.42, 0.97, 0.52, 1.49);
  transform: translateY(120px);
  opacity: 0;
  transition-delay: 1.2s;
  box-sizing: border-box;
  display: block;

  &[open] {
    transform: none;
    opacity: 1;
  }
`

const Rating = styled.div`
  font-weight: 800;
  font-size: 2.2em;
`

const ScoreResult = styled.div`
  font-weight: 600;
  font-size: 1.6em;
  opacity: 0.9;
  padding-bottom: 1em;
`

type GameOverProps = {
  timePassed: number
  weight: number
  onStartNewGame: () => void
}

export default ({ timePassed, weight, onStartNewGame }: GameOverProps) => {
  const [valveOn, setValveOn] = useState(true)
  useEffect(() => {
    requestAnimationFrame(() => setValveOn(false))
  }, [])

  return (
    <Page>
      <Header>Täydellinen uutto</Header>
      <Main>
        <Handle />
        <Nozzle on={valveOn} reverse />
        <Cup amount={cupFullness(weight)} />
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
      <GameOverModal open={!valveOn}>
        Rating:
        <Rating>{getRating(score(timePassed, weight))}</Rating>
        <ScoreResult>
          <Score timePassed={timePassed} weight={weight} />
          /1000
        </ScoreResult>
        <Button onClick={onStartNewGame}>Start a new game</Button>
      </GameOverModal>
    </Page>
  )
}

const getRating = (score: number) =>
  (score < 200 && 'Awful 🤢') ||
  (score < 400 && 'ABC coffee 🤷‍♀️') ||
  (score < 600 && 'Getting better! 🐒') ||
  (score < 800 && 'Amateur barista 👶') ||
  (score < 900 && `I'd drink that! ☕️`) ||
  (score < 950 && 'Master barista 💪') ||
  'Perfect! 🤩'
