import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    intialColorMode: "dark",
    useSystemColorMode: true,
  },
  styles: {
    global: {
      body: {
        margin: 0,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },

      code: {
        fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New',monospace",
      },
       '::-webkit-scrollbar': {
        width: '12px',
      },
      '::-webkit-scrollbar-track': {
        borderRadius: '10px',
        background: '#f1f1f1',
      },
      '::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        background: '#888',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },
    },
  },
});

export default theme;
