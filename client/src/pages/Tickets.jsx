import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast, Flex } from "@chakra-ui/react";

import SideBar from "../components/TicketSidebar";
import CreateTicket from "../components/TicketCreate";
import AllTickets from "../components/TicketAllTickets";
import TriageTickets from "../components/TicketTriage"; 
import OpenTickets from "../components/TicketOpen";
import ClosedTickets from "../components/TicketClosed";


// tab control adapted from: https://github.com/sahandghavidel/mern-blog/tree/main
export default function Tickets() {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser?.role === "Admin";
  const isEmployee = currentUser?.role === "Employee";

  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Flex direction="row" minHeight="20vh" maxHeight="100vh" position="fixed" width="100%" >
      <SideBar />
      {tab === "create" && <CreateTicket />}
      {tab === "tickets" && isAdmin && <AllTickets />}
      {tab === "triage" && (isAdmin || isEmployee) && <TriageTickets />}
      {tab === "open" && <OpenTickets />}
      {tab === "closed" && <ClosedTickets />}
    </Flex>
  );
}
