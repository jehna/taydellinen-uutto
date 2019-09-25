import React from 'react'
import MockValve from './components/Debug/Debug'
import Game from './Game'
import StartGame from './components/StartGame/StartGame'
import Playing from './components/Playing/Playing'
import Score from './components/Score/Score'

export default () => {
  return (
    <>
      <Game>
        {({ timePassed, startGame, state }) => {
          switch (state) {
            case 'not playing':
              return <StartGame onStart={startGame} />
            case 'playing':
            case 'waiting for valve to open':
              return <Playing timePassed={timePassed} />
            case 'ended':
              return <Score timePassed={timePassed} />
          }
        }}
      </Game>

      {process.env.NODE_ENV !== 'production' && <MockValve />}
    </>
  )
}
