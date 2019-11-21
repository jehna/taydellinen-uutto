import React, { useState } from 'react'
import styled from 'styled-components'
import Page, { Header, Footer, Handle, Nozzle, Cup, Main } from '../Common/Page'
import ScaleConnect from '../../ScaleConnect'
import Button from '../Common/Button'
import { Scale } from '../../Scale'
import { mockScale } from '../Debug/Debug'

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;

  button:first-child {
    margin-bottom: 0.5em;
    background: #ff6600;
    color: #fff;
    font-size: 1.6em;
    font-weight: 600;
  }
`

type StartGameProps = {
  onStart: (scale: Scale) => void
}

export default ({ onStart }: StartGameProps) => {
  const [connectedScale, setConnectedScale] = useState<Scale | null>(null)
  return (
    <Page>
      <Header>Täydellinen uutto</Header>
      <Main>
        <Handle />
        <Nozzle on={false} />

        <Buttons>
          {connectedScale ? (
            <Button onClick={() => onStart(connectedScale)}>Start game</Button>
          ) : (
            <>
              <ScaleConnect
                onScaleConnected={scale => setConnectedScale(scale)}
              />
              {process.env.NODE_ENV !== 'production' && (
                <Button onClick={() => setConnectedScale(mockScale)}>
                  Use debug scale
                </Button>
              )}
            </>
          )}
        </Buttons>

        <Cup amount={0} />
      </Main>
      <Footer>The perfect extraction</Footer>
    </Page>
  )
}
