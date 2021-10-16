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

    .column {
      margin: 20px 0;
    }
  }
`

export const PlayerWrapper = styled.div`
  position: relative;
  width: auto; // Reset width
  height: auto; // Reset height 

  //.react-player {
  //  padding-top: 56.25%; // Percentage ratio for 16:9
  //  position: relative; // Set to relative
  //}
  //
  //.react-player > div {
  //  position: absolute; // Scaling will occur since parent is relative now
  //}
`