import React from 'react'
import ScaleConnect from './ScaleConnect'
import { getWeight } from './global-weight'
import { round } from './utils/math-utils'
import MockValve from './MockValve'
import Game from './Game'

export default () => {
  return (
    <Game>
      {({ timePassed, startGame }) => (
        <div>
          <div>
            Grams:
            <h1>{round(getWeight(), 1)}</h1>
          </div>
          <div>
            Timer:
            <h1>{round(timePassed, 1)} s</h1>
          </div>
          <div>
            Score:
            <h1>{round(score(timePassed, getWeight()), -1)}</h1>
          </div>

          <button onClick={startGame}>Start game!</button>
          <ScaleConnect />

          {process.env.NODE_ENV !== 'production' && <MockValve />}
        </div>
      )}
    </Game>
  )
}

const TARGET_TIME = 25
const TARGET_GRAMS = 42
const MAX_SCORE = 1000
const MIN_SCORE = 100
const score = (timePassed: number, readingFromScale: number) => {
  const clampReadingFromScale = Math.min(readingFromScale, TARGET_GRAMS)

  const projectionTimeOnTargetGrams =
    (timePassed / clampReadingFromScale) * TARGET_GRAMS
  const projectedTimeDiff = Math.abs(TARGET_TIME - projectionTimeOnTargetGrams)
  const percentOfTimePassed = Math.max(timePassed / TARGET_TIME)
  const finalScore = Math.max(
    MAX_SCORE - MAX_SCORE * projectedTimeDiff * 0.1,
    MIN_SCORE
  )
  return finalScore * percentOfTimePassed || 0
}
