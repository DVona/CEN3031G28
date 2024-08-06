import { Flex, Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Text } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

export default function OpenTickets() {
  const { currentUser } = useSelector((state) => state.user);
  const [tickets, setTickets] = useState([]);
  const [showMore, setShowMore] = useState(true);

  const [ticketDescription, setTicketDescription] = useState("");
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [chatLogs, setChatLogs] = useState(""); // update this however needed to make work
  const [showChatModal, setShowChatModal] = useState(false);

  // Fetching open tickets based on user role
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        let endpoint = "/api/ticket/getopentickets";
        if (currentUser.role === "User") {
          endpoint += `?creatorId=${currentUser._id}`;
        } else if (currentUser.role === "Employee") {
          endpoint += `?assigneeId=${currentUser._id}`;
        }

        const res = await axios.get(endpoint);
        const data = res.data;
        setTickets(data.tickets);

        if (data.tickets.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTickets();
  }, [currentUser]);

  const handleShowMore = async () => {
    try {
      const res = await axios.get(`/api/ticket/getopentickets?startIndex=${tickets.length}`);
      const data = res.data;

      setTickets((prev) => [...prev, ...data.tickets]);
      if (data.tickets.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Flex width="100vw" justifyContent="center" mt="20" mb="10">
      <Box borderWidth="1px" rounded="lg" p={5} width="90%" height="65vh" overflowY="auto" boxShadow="0 5px 10px 0 rgba(158, 158, 158, 0.75)">
        {tickets.length > 0 ? (
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
                  </Tr>
                </Thead>
                <Tbody>
                  {tickets.map((ticket) => (
                    <Tr key={ticket._id}>
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
                      <Td>{ticket.assigneeUsername}</Td>
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
                      <Td>{ticket.estimate}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              {showMore && (
                <Flex justifyContent="center" mt="3">
                  <Button variant="link" onClick={handleShowMore}>
                    Show more
                  </Button>
                </Flex>
              )}
            </TableContainer>
          </>
        ) : (
          <Text>No open tickets found.</Text>
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
      </Box>
    </Flex>
  );
}
