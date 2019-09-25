import React from 'react'
import styled from 'styled-components'
import Page from '../Common/Page'
import ScaleConnect from '../../ScaleConnect'
import Button from '../Common/Button'

const Logo = styled.img`
  margin-bottom: 3em;
`

const Buttons = styled.div`
  button {
    margin: 0 0.5em;
  }
`

type StartGameProps = {
  onStart: () => void
}

export default ({ onStart }: StartGameProps) => (
  <Page>
    <Logo src="/img/logo.svg" alt="Täydellinen uutto" />
    <Buttons>
      <Button onClick={onStart}>Start game</Button>
      <ScaleConnect />
    </Buttons>
  </Page>
)
