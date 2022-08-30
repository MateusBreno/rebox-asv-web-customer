// ./src/styles/global.ts
import { createGlobalStyle, keyframes } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body{
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: Montserrat, sans-serif;
    font-size: 16px;
  }

  #root {
    /* max-width: 960px; */
    /* margin: 0 auto; */
    /* padding: 40px 20px; */
  }

  button{
    cursor: pointer;
    border:0;
    background:none;
  }

  a {
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 6px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.colors.blue.opacity.veryLow}; /* color of the tracking area */
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.colors.blue.main}; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
    border: none; /* creates padding around scroll thumb */
  }
`;

export const appearScreenFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
