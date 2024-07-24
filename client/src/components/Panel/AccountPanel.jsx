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


return (
    <Box>
      <Center>
      <Heading as="h3" size="lg" p={4}>
        Account Panel
      </Heading>
      </Center>  
      <Box borderWidth="1px" rounded="lg" overflow="hidden">
        <Box overflowX="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th color="text">Username</Th>
                <Th color="text">Password</Th>
                <Th color="text">Level</Th>
                <Th color="text">Action</Th>
              </Tr>
            </Thead>
            <Tbody>{}</Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}