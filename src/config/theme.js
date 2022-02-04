import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
    fontSize: 16,
  },
  palette: {
    primary: {
      main: '#CF1F38',
    },
    secondary: {
      main: '#36659C',
    },
    success: {
      main: '#298936',
    },
    textcolor: {
      main: '#5C5C5C',
    },
    background: {
      main: '#FAFAF6',
      dark: '#F5EFD9',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {},
    },
  },
});

export default theme;
