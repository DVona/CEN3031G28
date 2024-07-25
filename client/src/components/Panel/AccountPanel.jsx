/*TODO: 
- revamp nav bar with auth data
- calendar integration
*/
import {
  Box,
  Button,
  Heading,
  Center,
  Flex,
  Grid,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";




export default function AccountPanel() {

function ticketList() {
    // to be implemented
}

return (
    <Box height="90vh">
      <Center>
      <Heading as="h3" size="lg" p={4}>
        Account Panel
      </Heading>
      </Center>
      <Grid templateColumns='repeat(2, 1fr)' gap={6}>
      <Heading as="h3" size="md" p={4} ml="2">
            Tickets
            </Heading>
        <Heading as="h3" size="md" p={4} float="right" maxWidth="50%">
            Calendar
        </Heading> 
        </Grid>
      <Flex>
      <Box borderWidth="1px" rounded="lg" overflow="hidden" maxWidth="50%" ml="3" float="left">
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
      </Flex>
      <Box borderWidth="1px" rounded="lg" overflow="hidden" maxWidth="50%" float="right">
        </Box>
        <Flex verticalAlign={"bottom"} minHeight={"65vh"} maxWidth="50%" position="relative">
        <Button
            position="absolute"
            bottom="0"
            type="submit"
            colorScheme="blue"
            width="xl"
            size="lg"
            ml="3"
            mb="3"
        >    
            Create a Ticket
        </Button>
        <Button
            position="absolute"
            bottom="0"
            right="0"
            type="submit"
            colorScheme="green"
            width="half"
            size="lg"
            mb="3"
            mr="5"
           
        >    
            Chat
        </Button>
        </Flex>
      </Box>
  );
}