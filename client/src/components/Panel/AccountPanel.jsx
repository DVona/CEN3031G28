import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Center,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { API_URL } from "../../config";


export default function AccountPanel() {

function ticketList() {
    // to be implemented
}

return (
    <Box>
      <Center>
      <Heading as="h3" size="lg" p={4}>
        Account Panel
      </Heading>
      </Center>  
      <Heading as="h3" size="md" p={4} ml="3">
            Tickets
        </Heading> 
      <Box borderWidth="1px" rounded="lg" overflow="hidden" maxWidth="50%" ml="3">
        <Box overflowY="auto">
          <Table size="md">
            <Thead>
              <Tr>
                <Th color="text">Ticket ID</Th>
                <Th color="text">Assigned Employee</Th>
                <Th color="text">Status</Th>
              </Tr>
            </Thead>
            <Tbody>{ticketList()}</Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}