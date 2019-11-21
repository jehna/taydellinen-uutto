import React, { useState } from 'react'
import MockValve from './components/Debug/Debug'
import StartGame from './components/StartGame/StartGame'
import Playing from './components/Playing/Playing'
import GameOver from './components/GameOver/GameOver'
import { Scale } from './Scale'

type GameState = { type: 'not started' } | { type: 'started'; scale: Scale }

export default () => {
  const [state, setState] = useState<GameState>({ type: 'not started' })
  return (
    <>
      {state.type === 'not started' ? (
        <StartGame onStart={scale => setState({ type: 'started', scale })} />
      ) : (
        <Playing
          scale={state.scale}
          onEnded={() => console.log('Game over!')}
        />
      )}

      {process.env.NODE_ENV !== 'production' && <MockValve />}
    </>
  )
}
