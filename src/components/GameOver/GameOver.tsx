import React from 'react'
import Page from '../Common/Page'
import Score from '../Score/Score'

type GameOverProps = {
  timePassed: number
  weigth: number
}

export default ({ timePassed, weigth }: GameOverProps) => (
  <Page>
    <Score timePassed={timePassed} weight={weigth} />
  </Page>
)
