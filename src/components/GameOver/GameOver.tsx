import React from 'react'
import Page from '../Common/Page'
import Score from '../Score/Score'

type GameOverProps = {
  timePassed: number
}

export default ({ timePassed }: GameOverProps) => (
  <Page>
    <Score timePassed={timePassed} />
  </Page>
)
