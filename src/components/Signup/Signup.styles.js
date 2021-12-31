import styled from 'styled-components'
import {Card, Container} from "react-bootstrap"

export const Wrapper = styled(Container)`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 20px 20px;
`;

export const Content = styled.div`
  margin: 0 auto;
  padding: 10px;
  background: var(--clr-900-transparent);
  border-radius: 20px;
  max-width: 600px;
  color: var(--white);

`

export  const StyledCard = styled(Card)`
  background: var(--clr-900-transparent);
`