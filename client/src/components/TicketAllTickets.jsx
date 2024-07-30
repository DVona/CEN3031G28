import { Flex, Box, VStack, Text, Input, FormControl, Button, useToast, HStack } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AllTickets() {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser?.role === "Admin";
  const [tickets, setTickets] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [TicketIdToDelete, setTicketIdToDelete] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get("/api/ticket/gettickets");
        const data = res.data;

        setTickets(data.tickets);
        if (data.tickets.length < 9) {
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
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Flex height="relative" width="100%" justifyContent="center" mt="10" mb="10">
      <Box borderWidth="1px" rounded="lg" p={5} width="80%" boxShadow="0 5px 10px 0 rgba(158, 158, 158, 0.75)">
        {isAdmin && tickets.length > 0 ? (
          <>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Date created</Th>
                    <Th>Category</Th>
                    <Th>Description</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                {tickets.map((ticket) => (
                  <Tbody key={ticket._id}>
                    <Tr>
                      <Td>{new Date(ticket.createdAt).toLocaleDateString()}</Td>
                      <Td>{ticket.category}</Td>
                      <Td>{ticket.description}</Td>
                      <Td>
                        <Button
                          color="red"
                          variant="link"
                          onClick={() => {
                            setShowModal(true);
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
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
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
                <Button onClick={() => setShowModal(false)}>No, cancel</Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}
