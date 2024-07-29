import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast, Flex } from "@chakra-ui/react";

import SideBar from "../components/TicketSidebar";
import CreateTicket from "../components/TicketCreate";

// view all tickets in triage (employee)
// view all tickets (admin)

import OpenTickets from "../components/TicketOpen";
import ClosedTickets from "../components/TicketClosed";

export default function Tickets() {
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
    <Flex direction="row" height="100vh">
      <SideBar />
      {tab === "create" && <CreateTicket />}
      {tab === "open" && <OpenTickets />}
      {tab === "closed" && <ClosedTickets />}
    </Flex>
  );
}
