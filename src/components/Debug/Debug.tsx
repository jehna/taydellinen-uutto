import React from 'react'
import styled from 'styled-components'
import { getWeight, setWeight } from '../../global-weight'

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background: #fff;
  border-left: 1px solid #000;
  border-top: 1px solid #000;
  padding: 0.6em 0.4em;

  h3 {
    margin: 0.2em;
  }
`

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
  <Wrapper>
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
  </Wrapper>
)
