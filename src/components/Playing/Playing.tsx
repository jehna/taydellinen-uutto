import React from 'react'
import { round } from '../../utils/math-utils'
import Page from '../Common/Page'
import Score from '../Score/Score'

type PlyaingProps = {
  timePassed: number
}

export default ({ timePassed }: PlyaingProps) => (
  <Page>
    <div>
      Grams:
      <h1>{round(getWeight(), 1)}</h1>
    </div>
    <div>
      Timer:
      <h1>{round(timePassed, 1)} s</h1>
    </div>
    <Score timePassed={timePassed} />
  </Page>
)
