import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    background: "#121212", // Dark background color
    text: "#ffffff", // White text color
    // Add more colors as needed for your specific theme
  },
  fonts: {
    body: "Roboto, sans-serif", // Replace with your preferred font
    heading: "Roboto, sans-serif", // Replace with your preferred font
  },
  styles: {
    global: {
      body: {
        bg: "background",
        color: "text",
        opacity: "87%",
      },
    },
  },
});

export default theme;
