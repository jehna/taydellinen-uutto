import React from 'react'
import { round } from '../../utils/math-utils'
import { getWeight } from '../../global-weight'
import Page from '../Common/Page'

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
  </Page>
)
