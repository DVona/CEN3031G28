import { Flex, Box, VStack, Text, Input, FormControl, Button, useToast, HStack } from "@chakra-ui/react";
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
  const [showMore, setShowMore] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [TicketIdToDelete, setTicketIdToDelete] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [chatLogs, setChatLogs] = useState(""); // update this however needed to make work

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
    if (isAdmin) {
      fetchTickets();
    }
  }, [currentUser._id]);

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
    <Flex width="100%" justifyContent="center" mt="20" mb="10">
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
                      <Td>
                        <Button
                          variant="link"
                          onClick={() => {
                            setShowTicketModal(true);
                          }}
                        >
                          Override?
                        </Button>
                      </Td>
                      {/*
                      
                      Override Button
                      Assign Button
                      
                      */}

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
            <ModalHeader>Ticket</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{ticketDescription}</ModalBody>
            <ModalFooter>
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
      </Box>
    </Flex>
  );
}
