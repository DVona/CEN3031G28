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

const Record = (props) => (
  <Tr>
    <Td>{props.record.username}</Td>
    <Td>{props.record.password}</Td>
    <Td>{props.record.level}</Td>
    <Td>
      <Flex gap={2}>
        <Button as={Link} to={`/edit/${props.record._id}`} size="sm">
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

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const toast = useToast(); // Initialize useToast hook

  useEffect(() => {
    async function getRecords() {
      try {
        const response = await fetch(`${API_URL}/record/`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const records = await response.json();
        setRecords(records);
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
    getRecords();
  }, [toast]); // Include toast in the dependency array

  async function deleteRecord(id) {
    try {
      const response = await fetch(`${API_URL}/record/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
      const newRecords = records.filter((el) => el._id !== id);
      setRecords(newRecords);
      toast({
        title: "Success",
        description: "Record deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error.message);
      toast({
        title: "Error",
        description: "Failed to delete record.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  function recordList() {
    return records.map((record) => (
      <Record
        record={record}
        deleteRecord={() => deleteRecord(record._id)}
        key={record._id}
      />
    ));
  }

  return (
    <Box>
      <Heading as="h3" size="lg" p={4}>
        User Records
      </Heading>
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
            <Tbody>{recordList()}</Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
}
