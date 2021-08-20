import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background: var(--clr-900);
  padding: 10px 20px;
`;

export const Content = styled.div`
  position: relative;
  max-width: var(--maxWidth);
  width: 100%;
  height: 50px;
  background: var(--clr-800);
  margin: 0 auto;
  border-radius: 40px;
  color: var(--white);

  img {
    position: absolute;
    left: 15px;
    top: 14px;
    width: 30px;
  }

  input {
    font-size: var(--fontBig);
    position: absolute;
    left: 0;
    margin: 8px 0;
    padding: 0 0 0 60px;
    border: 0;
    width: 95%;
    background: transparent;
    height: 40px;
    color: var(--clr-50);

    :focus {
      position: absolute;
      width: 93%;
      border-radius: 60px;
      padding: 0 0 0 60px;
      height: 40px;
      left: 55px;
    }
  }
`;

