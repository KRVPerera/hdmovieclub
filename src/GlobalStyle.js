import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --maxWidth: 1280px;
    --white: #fff;
    --offWhite: #cfd0d1;
    --lightGrey: #454545;
    --medGrey: #353535;
    --darkGrey: #1c1c1c;
    --blue: #1c87c9;
    
    --clr-50 : #eceff1;
    --clr-100 : #cfd8dc;
    --clr-200 : #b0bec5;
    --clr-300 : #90a4ae;
    --clr-400 : #78909c;
    --clr-500 : #607d8b;
    --clr-600 : #546e7a;
    --clr-700 : #455a64;
    --clr-800 : #37474f;
    --clr-900 : #263238;
    --clr-900-transparent : rgba(38, 50, 56, 0.7);
    
    --fontSuperBig: 2.5rem;
    --fontBig: 1.5rem;
    --fontMed: 1.2rem;
    --fontSmall: 1rem;
  }

  * {
    box-sizing: border-box;
    font-family: 'Abel', sans-serif;
  }

  body {
    background-image: url('./images/dust_scratches.png');
    background-color: var(--clr-500);
    margin: 0;
    padding: 0;

    h1 {
      font-size: 2rem;
      font-weight: 600;
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
    }

    p {
      font-size: 1rem;
      color: var(--white);
    }
    
    .chip {
      font-size: 1rem;
      margin: 0.5px;
      background-color: var(--clr-700);
      font-weight: 400;
      color: var(--clr-50);
    }

  }
`;