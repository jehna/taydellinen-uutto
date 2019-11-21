import React from 'react'
import { round } from '../../utils/math-utils'

type ScoreProps = {
  timePassed: number
  weight: number
}

export default ({ timePassed, weight }: ScoreProps) => (
  <>{round(score(timePassed, weight), -1)}</>
)

const TARGET_TIME = 25
export const TARGET_GRAMS = 42
const MAX_SCORE = 1000
const MIN_SCORE = 100
export const score = (timePassed: number, readingFromScale: number) => {
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
