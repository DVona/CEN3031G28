import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";

import { API_URL } from "../../config";

const Ticket = (props) => (
  <Tr>
    <Td>{props.ticket.category}</Td>
    <Td>{props.ticket.estimate}</Td>
    <Td>{props.ticket.schedule}</Td>
    <Td>{props.ticket.assignee}</Td>
    <Td>{props.ticket.customer}</Td>
    <Td>{props.ticket.active}</Td>
    <Td>
      <Flex gap={2}>
        <Button as={Link} to={`ticket/edit/${props.ticket._id}`} size="sm">
          Edit
        </Button>
        <Button
          colorScheme="red"
          size="sm"
          onClick={() => props.deleteRecord(props.record._id)}
        >
          Delete
        </Button>
      </Flex>
    </Td>
  </Tr>
);

export default function TicketList() {
  //const API_URL="http://localhost:5050";
  const [tickets, setTickets] = useState([]);
  const toast = useToast(); // Initialize useToast hook

  useEffect(() => {
    async function getTickets() {
      try {
        const response = await fetch(`${API_URL}/ticket/all`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const ticketResponse = await response.json();
        setTickets(ticketResponse);
      } catch (error) {
        console.error(error.message);
        toast({
          title: "Error",
          description: "Failed to fetch records.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    getTickets();
  }, [toast]); // Include toast in the dependency array

  async function deleteTicket(id) {
    try {
      const response = await fetch(`${API_URL}/ticket/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
      const newTickets = tickets.filter((el) => el._id !== id);
      setTickets(newTickets);
      toast({
        title: "Success",
        description: "Ticket deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error.message);
      toast({
        title: "Error",
        description: "Failed to delete ticket.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  function TicketList() {
    return tickets.map((ticket) => (
      <Ticket
        ticket={ticket}
        deleteTicket={() => deleteTicket(ticket._id)}
        key={ticket._id}
      />
    ));
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
    <Box width="80%">
      <Heading as="h3" size="lg" p={4}>
        User Records
      </Heading>
      <Box borderWidth="1px" rounded="lg" overflow="hidden">
        <Box overflowX="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th color="text">Category</Th>
                <Th color="text">Estimate</Th>
                <Th color="text">Schedule</Th>
                <Th color="text">Assignee</Th>
                <Th color="text">Customer</Th>
                <Th color="text">Active</Th>
              </Tr>
            </Thead>
            <Tbody>{TicketList()}</Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
    </Flex>
  );
}
