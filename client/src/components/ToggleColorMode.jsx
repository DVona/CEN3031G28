import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";


const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const darkModeTransition = () => {
  toggleColorMode();
  const styleElement = document.createElement('style');
  const css = document.createTextNode(
    'html * { transition: color, background-color 0.4s ease-out!important }',
  );
  styleElement.appendChild(css);
  document.head.appendChild(styleElement);
  setTimeout(() => {
    document.head.removeChild(styleElement);
  }, 400);
  };

  return (
    <Button onClick={() => darkModeTransition()} m="1rem">
      {colorMode === "dark" ? <SunIcon color="orange.200" /> : <MoonIcon color="blue.700" />}
    </Button>
  );
  
};

export default ToggleColorMode;

// adapted from: https://www.youtube.com/watch?v=gCl78ZUGHg4