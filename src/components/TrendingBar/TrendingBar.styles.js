import styled from 'styled-components'

export const Wrapper = styled.div`
  overflow: scroll;
  //display: flex;
  white-space: nowrap;
  position: relative;
  max-width: 100%;
  margin: 0;
  padding: 0;
`;

export const Content = styled.div`
  margin: 0;
  background-color: var(--clr-600);

  .TrendBarFab {
    padding: 10px;
  }

  .TrendBarFabLeft {
    top: 30px;
    margin-right: 20px;
    position: absolute;
    z-index: 99999;
  }

  .TrendBarFabRight {
    margin: 80px 10px 0 10px;
    padding: 30px;
    position: center;
  }
`;

export const SlideBar = styled.div`
  overflow: scroll;
  scroll-behavior: smooth;
  display: flex;
`;

export const Title = styled.h3`
  width: 100%;
  align-content: center;
          background-color: var(--clr-800);
          margin: 0;
          text-align: center;
          color: var(--clr-50);
    `
;
