import styled from 'styled-components'

export const Wrapper = styled.div`
  //display: flex;
  color: var(--clr-100);
  background: var(--clr-900-transparent);;
  border-radius: 20px;
  width: 70%;
  align-items: center;
  padding: 10px;
  margin: 0 auto;
`;

export const Content = styled.div`
  align-items: center;
  text-align: center;
  //display: grid;
  //grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  //grid-gap: 2rem; 
  //background-color: blue;
`;

export const Text = styled.div`
  align-items: center;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 2rem; 
`;