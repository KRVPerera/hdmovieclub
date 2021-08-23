import styled from 'styled-components';

export const Image = styled.img`
  width: 100%;
  height: auto;
  //max-width: 150px;
  min-width: 150px;
  border: 1px solid var(--clr-900);
  transition: all 0.3s;
  border-radius: 5px;
  animation: animateThumb 0.5s;
  display: block;

  //@media screen and (max-width: 768px) {
  //  max-width: 100px;
  //}

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