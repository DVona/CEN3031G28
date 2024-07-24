/*TODO: 
- revamp nav bar with auth data
- calendar integration
*/
import {
  Box,
  Button,
  Heading,
  Center,
  Grid,
  Flex,
  Spacer,
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
    <Box>
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
      <Box borderWidth="1px" rounded="lg" overflow="hidden" maxWidth="50%" float="right">
        </Box>
      </Box>
  );
}