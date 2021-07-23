import styled from 'styled-components'

export const Spinner = styled.div`
  border: 5px solid var(--offWhite);
  border-top: 5px solid var(--medGrey);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spinner 1.5s linear infinite;
  margin: 20px auto;

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;