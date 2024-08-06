import { Flex, Box, Select, Text, Textarea, Input, FormControl, FormLabel, Button, useToast, HStack } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function TriageTickets() {
  const toast = useToast();
  const { currentUser } = useSelector((state) => state.user);
  const isValid = currentUser?.role === "Employee" || currentUser?.role === "Admin";

  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState({});
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showEstimateModal, setShowEstimateModal] = useState(false);
  const [ticketDescription, setTicketDescription] = useState("");
  const [chatLogs, setChatLogs] = useState(""); // update this however needed to make work
  const [estimate, setEstimate] = useState("");

  // fetching all triage tickets form db
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("/api/ticket/gettriagetickets");
        const data = res.data;

        setTickets(data.tickets);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (isValid) {
      fetchTickets();
    }
  }, [currentUser._id]);

  const handleEstimateSubmit = async () => {
    try {
      const res = await axios.put(`/api/ticket/update/${currentTicket._id}`, {
        estimate,
        arbitration: false,
      });

      const data = res.data;
      if (data.success === false) {
        console.log(data.message);
      } else {
        const updatedRes = await axios.get("/api/ticket/gettriagetickets");
        const updatedData = updatedRes.data;
        setTickets(updatedData.tickets);

        setShowEstimateModal(false);
        toast({
          title: "Estimate Updated",
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
        {isValid && tickets.length > 0 ? (
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
                    <Th>Assign Estimate</Th>
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
                      <Td>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          onClick={() => {
                            setCurrentTicket(ticket);
                            setShowEstimateModal(true);
                          }}
                        >
                          Assign
                        </Button>
                      </Td>
                    </Tr>
                  </Tbody>
                ))}
              </Table>
            </TableContainer>
          </>
        ) : (
          <Link to="/tickets?tab=create">
            <Text _hover={{ textDecoration: "underline" }}>Somehow No Tickets Exist. Create Some?</Text>
          </Link>
        )}

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

        <Modal blockScrollOnMount={false} isOpen={showEstimateModal} onClose={() => setShowEstimateModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Assign Estimate</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Estimate</FormLabel>
                <Select placeholder="Select estimate" onChange={(e) => setEstimate(e.target.value)}>
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
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleEstimateSubmit}>
                Submit
              </Button>
              <Button ml={3} onClick={() => setShowEstimateModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}
