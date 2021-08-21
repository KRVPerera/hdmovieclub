import styled from 'styled-components';

export const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 720px;
  transition: all 0.3s;
  object-fit: cover;
  border-radius: 20px;
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
  //margin: 0 auto;
  //display: block;
  //display: inline;
  //width: 100%;
  //background-color: pink;
`;