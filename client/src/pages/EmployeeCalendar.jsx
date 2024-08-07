import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Flex, Box, Select, Text, Textarea, Input, FormControl, FormLabel, Button, useToast, HStack } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
/*

export default function EmployeeCalendar() {
  const { currentUser } = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);
  const [selectedTicket, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoursworked, setHoursWorked] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`/api/event/get/${currentUser._id}`);
        const eventsData = res.data.events.map((event) => ({
          id: event.ticketId,
          title: event.title,
          start: event.start,
          end: event.end,
        }));
        setEvents(eventsData);
        //console.log(eventsData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = async (info) => {
    try {
      const ticketId = info.event.id;
      const res = await axios.get(`/api/ticket/get/${ticketId}`);
      const ticketData = res.data.ticket;
      setSelectedEvent(ticketData);
      setHoursWorked(ticketData.hoursWorked || "Log Hours");
      setIsModalOpen(true);
    } catch (error) {
      console.log(error.message);
    }
  };

    const handleSubmit = async () => {
      if (!selectedTicket) return;

      try {

        if (hoursworked !== selectedTicket.hoursWorked) {
          await axios.put(`/api/ticket/update/${selectedTicket._id}`, {
            ...selectedTicket,
            hoursworked, 
          });
        }


        const res = await axios.get(`/api/event/get/${currentUser._id}`);
        const updatedEvents = res.data.events.map((event) => ({
          id: event.ticketId,
          title: event.title,
          start: event.start,
          end: event.end,
        }));
        setEvents(updatedEvents);

        setIsModalOpen(false);
      } catch (error) {
        console.log(error.message);
      }
    };

  return (
    <Flex width="100vw" justifyContent="center" mt="20" mb="10">
      <Box borderWidth="1px" rounded="lg" p={5} width="90%" height="65vh" boxShadow="0 5px 10px 0 rgba(158, 158, 158, 0.75)">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "title",
            center: "",
            end: "dayGridMonth,dayGridWeek",
          }}
          events={events}
          height="100%"
          eventDisplay="block"
          eventClick={handleEventClick}
        />
      </Box>

      {selectedTicket && (
        <Modal blockScrollOnMount={false} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Ticket Details</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>Created By: {selectedTicket.creatorUsername}</FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel>Category: {selectedTicket.category}</FormLabel>
              </FormControl>
              <FormControl>
                <FormLabel>Description:</FormLabel>
                <Box height="10vh" overflowY="auto" borderWidth="1px" rounded="lg" p={2} margin={2}>
                  <Text>{selectedTicket.description}</Text>
                </Box>
              </FormControl>
              <FormControl>
                <FormLabel>Status:</FormLabel>
                <Button
                  width="100%"
                  colorScheme={selectedTicket.open ? "green" : "red"}
                  onClick={() =>
                    setSelectedEvent((prev) => ({
                      ...prev,
                      open: !prev.open,
                    }))
                  }
                >
                  {selectedTicket.open ? "Open" : "Closed"}
                </Button>
              </FormControl>
              <FormControl>
                <FormLabel>Hours Worked:</FormLabel>
                <Input placeholder={hoursworked} onChange={(e) => setHoursWorked(e.target.value)} />{" "}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSubmit} mr={5}>
                Save and Close
              </Button>
              <Button colorScheme="blue" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
}
*/

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
          events={[{ title: "Ticket #1", start: "2024-07-30T11:30:00", end: "2024-07-30T13:00:00", allDay: false, url: "https://google.com" }]}
        />
      </Box>
    </Flex>
  );
}
