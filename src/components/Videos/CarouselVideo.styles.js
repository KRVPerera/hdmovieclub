import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background: var(--clr-700);
`

export const Content = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  width: 100%;
  margin: 0 auto;
  justify-content: center;


  @media screen and (max-width: 768px) {
    display: block;
  }
`

export const PlayerWrapper = styled.div`
  position: relative;
`