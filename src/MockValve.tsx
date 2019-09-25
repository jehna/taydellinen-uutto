import React from 'react'
import { getWeight, setWeight } from './global-weight'

let valveOpenInterval = 0
const closeValve = () => clearInterval(valveOpenInterval)
const openValve = () => {
  valveOpenInterval = setInterval(() => {
    setWeight(
      getWeight() +
        (0.8 + Math.random() * 0.2) * (window as any).tampingPressure.value
    )
  }, 100)
}

export default () => (
  <>
    <div>
      <h3>Debug:</h3>
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
    <button onClick={openValve}>Open valves!</button>
    <button onClick={closeValve}>Close valves!</button>
  </>
)
