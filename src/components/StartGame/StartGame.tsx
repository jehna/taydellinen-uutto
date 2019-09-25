import React from 'react'
import styled from 'styled-components'
import Page from '../Common/Page'

const Button = styled.button`
  appearance: none;
  border: 0;
  background: #eee;
  font: inherit;
  display: inline-block;
  padding: 0.4em 0.6em 0.5em;
  border-radius: 0.3em;
  border-bottom: 0.2em solid rgba(0, 0, 0, 0.2);
  border-top: 0.05em solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
`
Button.defaultProps = { type: 'button' }

const Logo = styled.img`
  margin-bottom: 3em;
`

type StartGameProps = {
  onStart: () => void
}

export default ({ onStart }: StartGameProps) => (
  <Page>
    <Logo src="/img/logo.svg" alt="Täydellinen uutto" />
    <Button onClick={onStart}>Start game</Button>
  </Page>
)
