import styled from 'styled-components';

export const Wrapper = styled.div`
  background: var(--clr-900);
  padding: 0 15px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--maxWidth);
  padding: 20px 0;
  margin: 0 auto;
  color: var(--clr-50);

  a {
    color: var(--clr-50);
    text-decoration: none;
  }

  .MuiFormControlLabel-label{
    width: 150px;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  .clubImage,
  .noimage {
    width: 200px;
    //background-color: var(--clr-500);
  }

`;

export const LogoImg = styled.img`
  width: 150px;

  @media screen and (max-width: 500px) {
    width: 100px;
  }
`;

export const TMDBLogoImg = styled.img`
  width: 80px;

  @media screen and (max-width: 500px) {
    width: 60px;
  }
`;