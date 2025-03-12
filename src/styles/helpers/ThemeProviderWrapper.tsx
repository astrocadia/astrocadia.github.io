import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material';
import type { FunctionComponent, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#545D69',
    },
    secondary: {
      main: '#858c94',
    },
    text: {
      primary: '#09101d',
      secondary: '#09101d',
    },
    background: {
      default: '#545d69',
      paper: '#fffefc',
    },
    divider: '#dadee3',
  },
  typography: {
    fontFamily: "'DM Sans Regular 400', sans-serif",
  },
};

const theme = createTheme(themeOptions);

export const ThemeProviderWrapper: FunctionComponent<Props> = ({
  children,
}) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
