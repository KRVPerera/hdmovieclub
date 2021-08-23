import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  background: var(--clr-900);
  padding: 5px 50px 5px 10px;
  margin: 0 auto;
`;

export const Content = styled.div`
  position: relative;
  max-width: var(--maxWidth);
  width: 100%;
  height: 50px;
  background: var(--clr-800);
  align-content: center;
  margin: 0 auto;
  border-radius: 40px;
  color: var(--white);

  img {
    margin: 13px 15px;
    width: 25px;
  }

  input {
    font-size: var(--fontBig);
    position: absolute;
    left: 45px;
    padding: 15px 0 0 10px;
    border: 0;
    width: 95%;
    background: transparent;
    border-radius: 60px;
    color: var(--clr-50);

    :focus {
      position: absolute;
      padding: 15px 0 0 10px;
      margin: 0 0;
      border-radius: 60px;
      width: 94%;
    }
  }
  
  input[type=text]
  {
    height: 95%;
    line-height: 30px;
    padding:0 10px;
  }
`;

