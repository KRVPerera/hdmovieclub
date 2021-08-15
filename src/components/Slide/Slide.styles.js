import styled from 'styled-components';

export const Image = styled.img`
  //width: 100%;
  //margin: 0 auto;
  max-width: 150px;
  transition: all 0.3s;
  //object-fit: contain;
  float: left;
  border-radius: 5px;
  animation: animateThumb 0.5s;

  :hover {
    opacity: 0.8;
  }

  @keyframes animateThumb {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Wrapper = styled.div`
  //display: flex;
  width: 100%;
`