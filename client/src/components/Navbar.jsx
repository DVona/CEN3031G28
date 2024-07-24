import { NavLink } from "react-router-dom";
import { Box, Flex, Image, Button } from "@chakra-ui/react";
import ReactLogo from "../assets/react.svg";

export default function Navbar() {
  return (
    <Box mb={6}>
      <Flex justify="space-between" align="center" as="nav">
        <NavLink to="/account">
          <Image
            alt="React Logo"
            h={10}
            mt={2}
            ml={2}
            src={ReactLogo}
          />
        </NavLink>

        <NavLink to="/create">
          <Button
            as="div"
            size="md"
            fontWeight="medium"
            ringOffset="background"
            transition="all 0.2s"
            _focus={{
              outline: "none",
              ring: 2,
              ringColor: "ring",
              ringOffset: 2,
            }}
            _hover={{
              bg: "gray.500",
            }}
            border="1px"
            bg="background"
            color="text"
            borderColor="input"
            h={9}
            rounded="md"
            px={3}
          >
            Create User
          </Button>
        </NavLink>
      </Flex>
    </Box>
  );
}
