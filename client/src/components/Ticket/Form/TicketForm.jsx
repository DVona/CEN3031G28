import { Box, Button, Flex, 
  Heading, Text} from "@chakra-ui/react";
import FormFields from "./Fields";

function TicketForm({ form, updateForm, onSubmit}) {
  return (
    <Box as="form" onSubmit={onSubmit} borderWidth="1px" rounded="lg" p={4}>
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="flex-start"
        borderBottomWidth="1px"
        pb={12}
        mb={4}
      > 
        <Flex // Form Header
          direction={{ base: "column", md: "row" }}
          borderColor="gray.200"
          pb={12}
          mb={4}
        >
          <Box mb={{ base: 4, md: 0 }}>
            <Heading as="h2" size="md" mb={1}>
              Help Ticket Submission
            </Heading>
            <Text fontSize="sm" color="gray.600">
              We will fix your problem as soon as possible, or try and use our synchronus chat.
            </Text>
          </Box>
        </Flex>
      
        <FormFields form={form} updateForm={updateForm} />
      </Flex>
      <Button type="submit" colorScheme="blue" mt={4} width="full" size="lg">
        Submit Ticket
      </Button>
    </Box>
  );
}

export default TicketForm;
