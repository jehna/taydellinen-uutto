import React from 'react'
import ScaleConnector from './components/ScaleConnector/ScaleConnector'
import { Atom } from '@grammarly/focal'
import { Scale } from 'btscale/lib/scale'
import ScaleRecorder from './components/ScaleRecorder/ScaleRecorder'

export default ({ scale = Atom.create<Scale | null>(null) }) => (
  <div>
    <h1>Hello world</h1>
    <ScaleConnector selectedScale={scale} />
    <ScaleRecorder scale={scale} />
  </div>
)
