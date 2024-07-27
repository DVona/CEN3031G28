import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Flex, Button, VStack, useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

import MenuItem from "./MenuItemsForBars";
import axios from "axios";

const SideBar = (props) => {
  return (
    <NavBarContainer {...props}>
      <MenuLinks />
    </NavBarContainer>
  );
};

const MenuLinks = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const isEmployee = currentUser?.role === "Employee";

  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    //console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Box>
      <VStack align="left" spacing={4} whiteSpace="nowrap" width="200px">
        <MenuItem to="/tickets?tab=create">
          <Button size="md" w="100%" justifyContent="flex-start" variant={tab === "create" ? "solid" : "ghost"}>
            Create Ticket
          </Button>
        </MenuItem>
        <MenuItem to="/tickets?tab=active">
          <Button size="md" w="100%" justifyContent="flex-start" variant={tab === "active" ? "solid" : "ghost"}>
            Active Tickets
          </Button>
        </MenuItem>
        <MenuItem to="/tickets?tab=closed">
          <Button size="md" w="100%" justifyContent="flex-start" variant={tab === "closed" ? "solid" : "ghost"}>
            Closed Tickets
          </Button>
        </MenuItem>
        {/*
        {isAdmin && <MenuItem to="/users">Users</MenuItem>}
        {isEmployee && <MenuItem to="/calendar">Calendar</MenuItem>}
        {isAdmin ? (
          <>
            <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
            <MenuItem to="/sign-up-admin" isLast>
              <Button size="sm" rounded="md">
                Create Account
              </Button>
            </MenuItem>
          </>
        ) : (
          <MenuItem>
            <Button size="sm" rounded="md" color="black" bg="white" onClick={handleSignout}>
              Sign Out
            </Button>
          </MenuItem>
        )}
          */}
      </VStack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex height="100%" pl="5" pr="5" pt="5" {...props} borderRight="1px">
      {children}
    </Flex>
  );
};

export default SideBar;
