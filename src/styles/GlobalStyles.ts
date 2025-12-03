import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  :root {
    color-scheme: light;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color: #3a4861;
    background-color: #F4F4F6;
    --primary: #5b7cfa;
    --primary-dark: #4a68d9;
    --muted: #6D8187;
    --border: #eef1f5;
    --card-bg: #ffffff;
    --surface: #F4F4F6;
    --success: #2db46d;
    --danger: #ff5b60;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background-color: var(--surface);
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  #root {
    min-height: 100vh;
  }

  button, input, textarea {
    font: inherit;
  }
`
