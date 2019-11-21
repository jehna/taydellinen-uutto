import React, { useState } from 'react'
import MockValve from './components/Debug/Debug'
import StartGame from './components/StartGame/StartGame'
import Playing from './components/Playing/Playing'
import GameOver from './components/GameOver/GameOver'
import { Scale } from './Scale'

type GameState =
  | { type: 'not started' }
  | { type: 'started'; scale: Scale }
  | { type: 'ended'; weight: number; timePassed: number; scale: Scale }

export default () => {
  const [state, setState] = useState<GameState>({ type: 'not started' })
  return (
    <>
      {state.type === 'not started' ? (
        <StartGame onStart={scale => setState({ type: 'started', scale })} />
      ) : state.type === 'started' ? (
        <Playing
          scale={state.scale}
          onEnded={(weight, timePassed) =>
            setState({ type: 'ended', weight, timePassed, scale: state.scale })
          }
        />
      ) : (
        <GameOver
          weight={state.weight}
          timePassed={state.timePassed}
          onStartNewGame={() =>
            setState({ type: 'started', scale: state.scale })
          }
        />
      )}

      {process.env.NODE_ENV !== 'production' && <MockValve />}
    </>
  )
}
