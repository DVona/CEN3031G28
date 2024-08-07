import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Flex, Button, Stack, useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

import ToggleColorMode from "./ToggleColorMode";
import MenuItem from "./MenuItemsForBars";
import axios from "axios";

const NavBar = (props) => {
  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/sign-up") {
    return null;
  }

  return (
    <NavBarContainer {...props}>
      <ToggleColorMode />
      <MenuLinks />
    </NavBarContainer>
  );
};

const MenuLinks = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const isAdmin = currentUser?.role === "Admin";
  const isEmployee = currentUser?.role === "Employee";

  const handleSignout = async () => {
    try {
      const res = await axios.post("/api/user/signout");
      const data = res.data;
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      toast({
        title: "Sign Out Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      dispatch(signoutSuccess());
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box>
      <Stack spacing={8} align="center" justify="center" direction="row" pt="0">
        <MenuItem to="/dashboard">Home</MenuItem>
        <MenuItem to="/tickets?tab=create">Tickets</MenuItem>
        {isAdmin && <MenuItem to="/users">Users</MenuItem>}
        {(isEmployee || isAdmin) && <MenuItem to="/calendar">Calendar</MenuItem>}
        {isAdmin ? (
          <>
            <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
            <MenuItem to="/sign-up-admin" isLast>
              <Button colorScheme="blue" size="sm" rounded="md">
                Create Account
              </Button>
            </MenuItem>
          </>
        ) : (
          <MenuItem>
            <Button colorScheme="blue" onClick={handleSignout}>
              Sign Out
            </Button>
          </MenuItem>
        )}
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex align="center" justify="space-between" wrap="wrap" w="100%" pl="8" pr="8" {...props} borderBottom="1px">
      {children}
    </Flex>
  );
};

export default NavBar;
