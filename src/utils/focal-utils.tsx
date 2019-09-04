import React from 'react'
import { Atom, F } from '@grammarly/focal'

export const mapAtom = <T, R>(
  atom: Atom<Array<T>>,
  cb: (value: T, index: number, arr: T[]) => R
) => <F.Fragment>{atom.view(arr => arr.map(cb))}</F.Fragment>

export const ifEmpty = <T, R>(atom: Atom<Array<T>>, cb: () => R) => (
  <F.Fragment>{atom.view(a => !a.length && cb())}</F.Fragment>
)

export const ifElse = <T, R1, R2>(atom: Atom<T>, t: () => R1, f: () => R2) => (
  <F.Fragment>{atom.view(value => (value ? t() : f()))}</F.Fragment>
)
