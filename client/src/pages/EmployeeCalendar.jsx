import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import { Box, Flex } from "@chakra-ui/react";

export default function EmployeeCalendar() {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Box width="60%" mt="10">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "title",
            center: "",
            end: "dayGridMonth,dayGridWeek,timeGridDay",
          }}
          height="80vh"
          // TODO: implement onClick -> ticket URL
          events={[{ title: "Ticket #1", start: "2024-07-30T11:30:00", end: "2024-07-30T13:00:00", allDay: false , url: "https://google.com"}]}
        /> 
      </Box>
    </Flex>
  );
}


// continue working on page display
// events will fetch for info from backend 
// info will display fetching from the current user
// different solution for admins (will select from users)
//    /users/:id/calendar (example route)