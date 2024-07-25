import { Box, Heading, Text, Flex } from "@chakra-ui/react";

function Header() {
  return (
    <Flex
      direction="column"
      pb={12}
      mb={4}
      width="100%"
    >
      <Box mb={{ base: 4, md: 0 }}>
        <Heading as="h2" size="md" mb={1}>
          Sign Up
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Please enter your details to create an account.
        </Text>
      </Box>
    </Flex>
  );
}

export default Header;
