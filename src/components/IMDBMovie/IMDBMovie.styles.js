import styled from 'styled-components'

export const Wrapper = styled.div`
  //display: flex;
  color: var(--clr-100);
  background: var(--clr-900-transparent);;
  border-radius: 20px;
  width: 98%;
  align-items: center;
  padding: 2px 5px 20px 5px;
  justify-content: center;
  margin: 0;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

export const Content = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Text = styled.div`
  align-items: center;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 2rem; 
`;