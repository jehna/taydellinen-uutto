import React, { useEffect } from 'react'
import { Atom, lift } from '@grammarly/focal'
import { pairwise } from 'rxjs/operators'
import { ScaleFinder } from 'btscale/lib/scale_finder'
import { Scale } from 'btscale/lib/scale'
import { mapAtom, ifEmpty } from '../../utils/focal-utils'

export default ({
  scales = Atom.create<Scale[]>([]),
  selectedScale = Atom.create<Scale | null>(null)
}) => {
  useEffect(() => {
    const finder = new ScaleFinder()
    finder.startDiscovery()
    const pollOnce = () => scales.set(finder.scales)
    const poller = setInterval(pollOnce, 1000)
    return () => clearInterval(poller)
  })

  selectedScale.pipe(pairwise()).subscribe(([prev, next]) => {
    if (prev !== null) prev.disconnect()
    if (next !== null) next.connect()
  })

  return (
    <div>
      <DisconnectScale
        scale={selectedScale}
        onClick={() => selectedScale.set(null)}
      />

      {mapAtom(scales, scale => (
        <button type="button" onClick={() => selectedScale.set(scale)}>
          Connect to {scale.name}
        </button>
      ))}

      {ifEmpty(scales, () => 'Looking for scales...')}
    </div>
  )
}

const DisconnectScale = lift<{ scale: Scale | null; onClick: () => void }>(
  ({ scale, onClick }) =>
    scale && <button onClick={onClick}>Disconnect {scale.name}</button>
)
