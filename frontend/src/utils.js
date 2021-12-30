
function convertTheme(rawThemeConfig) {
  try {
    return JSON.parse(rawThemeConfig || '{}');
  } catch (error) {
    console.error('Impossible to convert theme!', error);
    return {}
  }
};

export { convertTheme };
