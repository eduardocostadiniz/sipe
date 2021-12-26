import React, { useState } from "react";
import { ThemeProvider } from 'styled-components';

import defaultTheme from '../themes/theme';
import { GlobalStyle } from '../styles/globals';

const CustomThemeContext = React.createContext({});

export const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  function defineUserTheme(rawThemeConfig) {
    try {
      const themeConfig = JSON.parse(rawThemeConfig || '{}');
      if (themeConfig && themeConfig.primary && themeConfig.primary != defaultTheme.primary) {
        setTheme(themeConfig);
      }
    } catch (error) {
      console.error('Impossible to set theme!', error);
    }
  }

  return (
    <CustomThemeContext.Provider value={{ theme, defineUserTheme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
}

export default CustomThemeContext;