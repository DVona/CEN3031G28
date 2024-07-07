import { Box, Heading, Text, Flex } from "@chakra-ui/react";

function FormHeader() {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      borderColor="gray.200"
      pb={12}
      mb={4}
    >
      <Box mb={{ base: 4, md: 0 }}>
        <Heading as="h2" size="md" mb={1}>
          User Info
        </Heading>
        <Text fontSize="sm" color="gray.600">
          Enter desired user information.
        </Text>
      </Box>
    </Flex>
  );
}

export default FormHeader;
