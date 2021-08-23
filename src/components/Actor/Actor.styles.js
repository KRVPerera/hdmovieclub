import styled from 'styled-components'

export const Wrapper = styled.div`
  color: var(--clr-100);
  background: var(--clr-900);
  border-radius: 20px;
  padding: 5px;
  text-align: center;
  
  h3 {
    margin: 10px 0 0 0;
  }
  
  p {
    margin: 5px 0;
  }
  
  a {
    color: var(--clr-50)
  }
`

export const Image = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
  border-radius: 15px;
`