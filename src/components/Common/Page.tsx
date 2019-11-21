import styled from 'styled-components'

export default styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
`

export const Header = styled.header`
  background: #3d535e;
  width: 100vw;
  color: #fff;
  font-weight: 600;
  height: 32.06vh;
  display: flex;
  justify-content: center;
  font-size: 6vh;
  align-items: center;
  flex-direction: column;
`

export const Footer = styled.footer`
  background: #3d535e;
  width: 100vw;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  height: 32.06vh;
  display: flex;
  justify-content: center;
  font-size: 5vh;
  align-items: center;
  flex-direction: column;
`

export const Handle = styled.div`
  background: #3d535e;
  height: 1.5em;
  width: 3.9em;
  border-radius: 0 0 0.5em 0.5em;
  position: relative;

  &:before {
    display: block;
    position: absolute;
    right: 4.3em;
    top: 0.1em;
    border-radius: 0.4em;
    background: inherit;
    height: 1.1em;
    width: 5.4em;
    content: '';
  }

  &:after {
    display: block;
    position: absolute;
    right: 3.8em;
    top: 0.4em;
    background: inherit;
    height: 0.52em;
    width: 0.7em;
    content: '';
  }
`

export const Nozzle = styled.div<{ on: boolean; reverse?: boolean }>`
  background: #3d535e;
  height: 0.9em;
  width: 1.7em;
  border-radius: 0 0 0.5em 0.5em;
  position: relative;

  :after {
    content: '';
    display: block;
    background: #273669;
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -0.2em;
    width: 0.4em;
    height: calc(35.88vh - 2.4em - 0.8em);
    transition: transform 0.5s;
    transform: scaleY(${({ on }) => (on ? 1 : 0)});
    transform-origin: 0 ${({ reverse }) => (reverse ? 100 : 0)}%;
  }
`

export const Cup = styled.div<{ amount: number }>`
  background: rgba(62, 83, 94, 0.72);
  width: 6.4em;
  height: 5.4em;
  margin-top: auto;
  border-radius: 0 0 50% 50%;
  position: relative;
  z-index: 0;

  &:before {
    content: '';
    background: rgba(62, 83, 94, 0.72);
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    right: -1.7em;
    top: 1em;
    display: block;
    position: absolute;
  }

  &:after {
    content: '';
    background: linear-gradient(to bottom, #263569 0%, #263569 0%);
    border-radius: 0 0 50% 50%;
    width: 4.9em;
    height: 4.6em;
    right: 0.7em;
    bottom: 0.8em;
    display: block;
    position: absolute;
    transition: background-position 0.1s;
    background-position-y: ${({ amount }) => (1 - amount) * 4.7}em;
    background-repeat: no-repeat;
  }
`

export const Main = styled.main`
  flex: 1;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  flex-direction: column;
`
