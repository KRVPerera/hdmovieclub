import styled from 'styled-components'
import {IMAGE_BASE_URL, BACKDROP_SIZE} from "../../config"

export const Wrapper = styled.div`
  background: ${({backdrop}) =>
    backdrop ? `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdrop})` : '#000'};
  background-size: cover;
  background-position: center;
  padding: 40px 20px;
  animation: animateMovieInfo 1s;

  @keyframes animateMovieInfo {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const Content = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  margin: 0 auto;
  background: var(--clr-900-transparent);
  border-radius: 20px;

  @media screen and (max-width: 768px) {
    display: block;
    max-height: none;
  }

`

export const Text = styled.div`
  width: 100%;
  padding: 20px 40px;
  color: var(--clr-100);
  overflow: hidden;

  .rating-directors {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0.5em;
    text-align: center;
    flex-wrap: wrap;
  }
  
  .director {
    //margin: 2em;
  }
  
  p {
    margin: 0;
  }

  .date {
    margin: 2em;
  }

  .item {
    margin: 2em;
  }
  
  h1 {
    @media screen and (max-width: 768px) {
      font-size: var(--fontBig)
    }
  }

  .score {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 40px;
    width: 100%;
    background: var(--clr-200);
    color: var(--clr-800);
    font-weight: 800;
    border-radius: 50%;
    margin: 0 auto;
    padding: 0;
  }
`