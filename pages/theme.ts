import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    background: {
      paper: '#F5F5F5',
      default: '#000'
    },
    // custom
    gradual: {
      main: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(92.81deg, #940DFF 8.74%, #0094FF 49.27%)'
    }
  },
  typography: {
    fontFamily: 'PingFang SC,Microsoft YaHei, Arial'
  }
});

export default theme;

declare module '@mui/material/styles' {
  interface Palette {
    gradual: Palette['primary'];
  }

  interface PaletteOptions {
    gradual?: PaletteOptions['primary'];
  }
}