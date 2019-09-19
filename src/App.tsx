import React, { useCallback, useState } from 'react'

let readingFromScale = 0
let foo = 0
const closeValve = () => clearInterval(foo)
const openValve = () => {
  foo = setInterval(() => {
    readingFromScale +=
      (0.8 + Math.random() * 0.2) * (window as any).tampingPressure.value
  }, 100)
}

type GameState = 'not playing' | 'playing' | 'ended'
const COOLOFF_TIME = 500

export default () => {
  const [startTime, setStartTime] = useState()
  const [, forceUpdate] = useState()

  const start = useCallback(() => {
    let lastTimeReadingChanged = 0
    let lastReading = 0
    let gameState: GameState = 'not playing'
    let timer = -1
    const stop = () => clearInterval(timer)
    const watchValve = () => {
      if (gameState === 'not playing' && readingFromScale !== 0) {
        gameState = 'playing'
        setStartTime(Date.now())
      }

      if (gameState === 'playing') {
        if (lastReading !== readingFromScale) {
          lastTimeReadingChanged = Date.now()
          lastReading = readingFromScale
        } else if (Date.now() - lastTimeReadingChanged >= COOLOFF_TIME) {
          gameState = 'ended'
          stop()
        }
      }

      forceUpdate(Math.random())
    }
    timer = setInterval(watchValve, 100)
  }, [])

  const timePassed = startTime ? (Date.now() - startTime) / 1000 : 0

  return (
    <div>
      <div>
        Grams:
        <h1>{round(readingFromScale, 1)}</h1>
      </div>
      <div>
        Timer:
        <h1>{round(timePassed, 1)} s</h1>
      </div>
      <div>
        Score:
        <h1>{round(score(timePassed, readingFromScale), -1)}</h1>
      </div>
      <div>
        <div>Tamping pressure:</div>
        <input
          type="range"
          min="0.1"
          max="1.0"
          step="0.01"
          defaultValue="0.19"
          id="tampingPressure"
        />
      </div>

      <button onClick={start}>Start game!</button>
      <button onClick={openValve}>Open valves!</button>
      <button onClick={closeValve}>Close valves!</button>
    </div>
  )
}

const round = (num: number, n: number) => Math.round(num * 10 ** n) / 10 ** n

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
