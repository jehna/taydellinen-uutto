import React, { useCallback } from 'react'
import { lift, Atom } from '@grammarly/focal'
import { Scale } from 'btscale/lib/scale'
import { mapAtom } from '../../utils/focal-utils'

export default lift<{ scale: Scale | null }>(({ scale }) => {
  if (!scale) return null

  return (
    <div>
      <h1>Hello {scale.name}!</h1>
      <Log scale={scale} />
    </div>
  )
})

interface LogRow {
  weight: number
  timestamp: number
}

const Log: React.FC<{ scale: Scale; log?: Atom<LogRow[]> }> = ({
  scale,
  log = Atom.create([])
}) => {
  const addNewWeigth = () =>
    log.modify(append({ weight: scale.weight, timestamp: Date.now() }))

  const start = useCallback(() => {
    scale.startRecording()
    scale.addEventListener('weightMeasured', addNewWeigth)
  }, [scale])

  const stop = useCallback(() => {
    scale.removeEventListener('weightMeasured', addNewWeigth)
  }, [scale])

  return (
    <>
      <button onClick={start} type="button">
        Start tracking!
      </button>
      <button onClick={stop} type="button">
        Stop tracking!
      </button>

      <h3>Log:</h3>
      {mapAtom(log, entry => (
        <div>
          {entry.timestamp}: {entry.weight}
        </div>
      ))}
    </>
  )
}

const append = <T, _>(value: T) => (list: T[]) => [...list, value]
