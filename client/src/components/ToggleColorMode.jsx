import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={() => toggleColorMode()} m="1rem">
      {colorMode === "dark" ? <SunIcon color="orange.200" /> : <MoonIcon color="blue.700" />}
    </Button>
  );
};

export default ToggleColorMode;

// adapted from: https://www.youtube.com/watch?v=gCl78ZUGHg4