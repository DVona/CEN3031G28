import { NavLink } from "react-router-dom";
import { Box, Flex, Image, HStack} from "@chakra-ui/react";
import ReactLogo from "../assets/react.svg";
import Logout from "./Logout/Logout";
import Create from "./CreateUser/Create";
import TicketButton from "./Ticket/TicketCreate";

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
        <HStack spacing={1} ml="auto">
          <TicketButton />
          <Create />
          <Logout />
        </HStack>

      </Flex>
    </Box>
  );
}
