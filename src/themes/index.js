import { createTheme } from '@mui/material/styles';

// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// project imports
import themePalette from './palette';

export const theme = () => {
  const color = colors;

  const themeOption = {
    colors: color,
    heading: color.primaryMain,
    paper: color.paper,
    backgroundDefault: color.background,
    background: color.primaryLight,
    mainTextPrimary: color.primaryMain,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.primaryDark,
    menuSelectedBack: color.primaryLight,
    divider: color.grey200,
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
  };

  const themes = createTheme(themeOptions);

  return themes;
};

export default theme;
