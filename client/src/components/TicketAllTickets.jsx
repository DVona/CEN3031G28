import { Flex, Box, Select, Text, Textarea, Input, FormControl, FormLabel, Button, useToast, HStack } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AllTickets() {
  const toast = useToast();
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser?.role === "Admin";

  const [tickets, setTickets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [TicketIdToDelete, setTicketIdToDelete] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [chatLogs, setChatLogs] = useState(""); // update this however needed to make work

  const [currentTicket, setCurrentTicket] = useState({
    _id: "",
    creatorUsername: "",
    assigneeUsername: "",
    description: "",
    category: "",
    open: true,
    arbitration: true,
    estimate: "",
    hoursWorked: "",
  });

  // fetching all tickets form db
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("/api/ticket/gettickets");
        const data = res.data;

        setTickets(data.tickets);
        if (data.tickets.length < 9) {
          console.log("less than 9");
          setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchEmployees = async () => {
      try {
        const res = await axios.get("/api/user/getemployees");
        const data = res.data;
        setEmployees(data.employees);
        // console.log(data.employees);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (isAdmin) {
      fetchTickets();
      fetchEmployees();
    }
  }, [currentUser._id]);

  // showmore button to extend table
  const handleShowMore = async () => {
    const startIndex = tickets.length;
    try {
      const res = await axios.get(`/api/ticket/gettickets?startIndex=${startIndex}`);
      const data = await res.data;

      setTickets((prev) => [...prev, ...data.tickets]);
      if (data.tickets.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOpenTicketModal = (ticket) => {
    setCurrentTicket(ticket);
    setShowTicketModal(true);
  };

  const getEstimateInMilliseconds = (estimate) => {
    const estimateMap = {
      "30 minutes": 30 * 60 * 1000,
      "1 hour": 60 * 60 * 1000,
      "2 hours": 2 * 60 * 60 * 1000,
      "3 hours": 3 * 60 * 60 * 1000,
      "4 hours": 4 * 60 * 60 * 1000,
      "1 day": 24 * 60 * 60 * 1000,
      "2 days": 2 * 24 * 60 * 60 * 1000,
      "3 days": 3 * 24 * 60 * 60 * 1000,
    };
    return estimateMap[estimate] || 0;
  };

  const handleOverrideTicket = async () => {
    try {
      //console.log(currentTicket);
      const res = await axios.put(`/api/ticket/update/${currentTicket._id}`, currentTicket);
      const data = await res.data;
      //console.log(data);

      if (data.success === false) {
        console.log(data.message);
      } else {
        setTickets((prev) => prev.map((ticket) => (ticket._id === currentTicket._id ? currentTicket : ticket)));

        if (currentTicket.assigneeId) {
          const estimate = currentTicket.estimate;
          const start = new Date();
          const end = new Date(start.getTime() + getEstimateInMilliseconds(estimate));

          // Prepare event data
          const eventData = {
            ticketId: currentTicket._id,
            employeeId: currentTicket.assigneeId,
            start: start.toISOString(),
            end: end.toISOString(),
            title: "Ticket",
          };

          try {
            await axios.put("/api/event/update", eventData);
            console.log("Event updated successfully");
          } catch (error) {
            if (error.response && error.response.status === 404) {
              await axios.post("/api/event/create", eventData);
              console.log("Event created successfully");
            } else {
              console.log("Error updating event:", error.message);
            }
          }
        }

        setShowTicketModal(false);
        toast({
          title: "Ticket Updated",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // delete button to completely delete ticket
  const handleDeleteTicket = async () => {
    try {
      const res = await axios.delete(`/api/ticket/delete/${TicketIdToDelete}`);
      const data = await res.data;
      if (data.success === false) {
        console.log(data.message);
      } else {
        setTickets((prev) => prev.filter((ticket) => ticket._id !== TicketIdToDelete));
        setShowDeleteModal(false);
        toast({
          title: "Ticket Deleted",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Flex width="100vw" justifyContent="center" mt="20" mb="10">
      <Box borderWidth="1px" rounded="lg" p={5} width="90%" height="65vh" overflowY="auto" boxShadow="0 5px 10px 0 rgba(158, 158, 158, 0.75)">
        {isAdmin && tickets.length > 0 ? (
          <>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Date created</Th>
                    <Th>Category</Th>
                    <Th>Description</Th>
                    <Th>Made By</Th>
                    <Th>Assigned To</Th>
                    <Th>Chat</Th>
                    <Th>Open</Th>
                    <Th>In Triage</Th>
                    <Th>Estimate</Th>
                    <Th>Hours Worked</Th>
                    <Th>Override</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                {tickets.map((ticket) => (
                  <Tbody key={ticket._id}>
                    <Tr>
                      <Td>{new Date(ticket.createdAt).toLocaleDateString()}</Td>
                      <Td>{ticket.category}</Td>
                      <Td>
                        <Button
                          variant="link"
                          onClick={() => {
                            setShowDescriptionModal(true);
                            setTicketDescription(ticket.description);
                          }}
                        >
                          View
                        </Button>
                      </Td>

                      <Td>{ticket.creatorUsername}</Td>
                      <Td>{ticket.assigneeUsername} </Td>
                      <Td>
                        <Button
                          variant="link"
                          onClick={() => {
                            setShowChatModal(true);
                            //setChatLogs(ticket.chat); update handling of chat logs
                          }}
                        >
                          View
                        </Button>
                      </Td>
                      <Td>{ticket.open ? "Open" : "Closed"}</Td>
                      <Td>{ticket.arbitration ? "Yes" : "No"}</Td>
                      <Td>{ticket.estimate} </Td>
                      <Td>{ticket.hoursworked} </Td>
                      <Td>
                        <Button variant="link" onClick={() => handleOpenTicketModal(ticket)}>
                          Override?
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          color="red"
                          variant="link"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setTicketIdToDelete(ticket._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  </Tbody>
                ))}
              </Table>
              <Flex justifyContent="center" mt="3">
                {showMore && (
                  <Button variant="link" onClick={handleShowMore}>
                    Show more
                  </Button>
                )}
              </Flex>
            </TableContainer>
          </>
        ) : (
          <Link to="/tickets?tab=create">
            <Text _hover={{ textDecoration: "underline" }}>Somehow No Tickets Exist. Create Some?</Text>
          </Link>
        )}
      </Box>
      <Modal blockScrollOnMount={false} isOpen={showDescriptionModal} onClose={() => setShowDescriptionModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{ticketDescription}</ModalBody>
          <ModalFooter>
            <Button onClick={() => setShowDescriptionModal(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/*
         do whatever you need to make chat logs show when that view button is clicked
         does not have to be this modal that i made literally do whatever you want
        */}
      <Modal blockScrollOnMount={false} isOpen={showChatModal} onClose={() => setShowChatModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chat Log</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{chatLogs}</ModalBody>
          <ModalFooter>
            <Button onClick={() => setShowChatModal(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal blockScrollOnMount={false} isOpen={showTicketModal} onClose={() => setShowTicketModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Override Ticket made by {currentTicket.creatorUsername}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Assigned To</FormLabel>
              <Select
                placeholder="Please Select an Option"
                onChange={(e) => {
                  const selectedEmployee = employees.find((employee) => employee.username === e.target.value);
                  setCurrentTicket({
                    ...currentTicket,
                    assigneeUsername: selectedEmployee.username,
                    assigneeId: selectedEmployee._id,
                  });
                }}
              >
                {employees.map((employee) => (
                  <option key={employee._id} value={employee.username}>
                    {employee.username}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>Category</FormLabel>
              <Select placeholder={currentTicket.category} onChange={(e) => setCurrentTicket({ ...currentTicket, category: e.target.value })}>
                {currentTicket.category !== "Account Help" && <option value="Account Help">Account Help</option>}
                {currentTicket.category !== "Repair Request" && <option value="Repair Request">Repair Request</option>}
                {currentTicket.category !== "Bug Report" && <option value="Bug Report">Bug Report</option>}
                {currentTicket.category !== "Security Issue" && <option value="Security Issue">Security Issue</option>}
                {currentTicket.category !== "Other" && <option value="Other">Other</option>}
              </Select>
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>Description</FormLabel>
              <Textarea height="20vh" width="100%" resize="none" value={currentTicket.description} onChange={(e) => setCurrentTicket({ ...currentTicket, description: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Estimate</FormLabel>
              <Select placeholder={currentTicket.estimate} onChange={(e) => setCurrentTicket({ ...currentTicket, estimate: e.target.value })}>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
                <option value="3 hours">3 hours</option>
                <option value="4 hours">4 hours</option>
                <option value="1 day">1 day</option>
                <option value="2 days">2 days</option>
                <option value="3 days">3 days</option>
              </Select>
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>Open</FormLabel>
              <Button
                width="100%"
                colorScheme={currentTicket.open ? "green" : "red"}
                onClick={() =>
                  setCurrentTicket({
                    ...currentTicket,
                    open: !currentTicket.open,
                  })
                }
              >
                {currentTicket.open ? "Open" : "Closed"}
              </Button>
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>In Triage</FormLabel>
              <Button
                width="100%"
                colorScheme={currentTicket.arbitration ? "green" : "red"}
                onClick={() =>
                  setCurrentTicket({
                    ...currentTicket,
                    arbitration: !currentTicket.arbitration,
                  })
                }
              >
                {currentTicket.arbitration ? "Yes" : "No"}
              </Button>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleOverrideTicket}>
              Save
            </Button>
            <Button onClick={() => setShowTicketModal(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Are You Sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this ticket?</ModalBody>
          <ModalFooter>
            <HStack align="center">
              <Button bg="red" mr="3" onClick={handleDeleteTicket}>
                Yes, I'm sure
              </Button>
              <Button onClick={() => setShowDeleteModal(false)}>No, cancel</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
