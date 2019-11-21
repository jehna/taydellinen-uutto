import React from 'react'
import MockValve from './components/Debug/Debug'
import Game from './Game'
import StartGame from './components/StartGame/StartGame'
import Playing from './components/Playing/Playing'
import GameOver from './components/GameOver/GameOver'

export default () => {
  return (
    <>
      <StartGame />

      {process.env.NODE_ENV !== 'production' && <MockValve />}
    </>
  )
}
