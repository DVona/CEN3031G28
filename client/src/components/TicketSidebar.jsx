import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Flex, Button, VStack, useToast, Menu } from "@chakra-ui/react";
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
  const isEmployee = currentUser?.role === "Employee";
  const isAdmin = currentUser?.role === "Admin";

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
        {isAdmin && (
          <MenuItem to="/tickets?tab=tickets">
            <Button size="md" w="100%" justifyContent="flex-start" variant={tab === "tickets" ? "solid" : "ghost"}>
              View All Tickets
            </Button>
          </MenuItem>
        )}
        {(isEmployee || isAdmin) && (
          <MenuItem to="/tickets?tab=triage">
            <Button size="md" w="100%" justifyContent="flex-start" variant={tab === "triage" ? "solid" : "ghost"}>
              Tickets in Triage
            </Button>
          </MenuItem>
        )}
        <MenuItem to="/tickets?tab=open">
          <Button size="md" w="100%" justifyContent="flex-start" variant={tab === "open" ? "solid" : "ghost"}>
            Open Tickets
          </Button>
        </MenuItem>
        <MenuItem to="/tickets?tab=closed">
          <Button size="md" w="100%" justifyContent="flex-start" variant={tab === "closed" ? "solid" : "ghost"}>
            Closed Tickets
          </Button>
        </MenuItem>
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
