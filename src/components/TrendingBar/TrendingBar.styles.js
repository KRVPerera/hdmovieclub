import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  //position: relative;
  margin: 0;
  padding: 0;
  //width: 100vw;
  //position: relative;
  max-width: var(--maxWidth);
  //height: 200px;
  align-items: center;
  text-align: center;
  background-color: brown;
`;

export const Content = styled.div`
  display: flex;
  //float: left;
  //padding: 58px;
  //width: 100%;
  max-width: var(--maxWidth);
  text-align: center;
  position: relative;
  //height: 100px;
  padding: 0;
  color: darkblue;
  background-color: darkblue;
`;

export const Title = styled.h3`
    background-color: var(--clr-800);
  margin: 0;
  text-align: center;
  color: var(--clr-50);
`
;