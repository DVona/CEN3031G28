import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Fields from "./Fields";

function SignUpForm({ form, updateForm, onSubmit }) {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box
        as="form"
        onSubmit={onSubmit}
        borderWidth="1px"
        rounded="lg"
        p={4}
        width="75%"
      >
        <Flex
          direction="column"
          alignItems="center"
          borderBottomWidth="1px"
          pb={12}
          mb={4}
        >
          <Header />
          <Fields form={form} updateForm={updateForm} />
        </Flex>
        <Stack direction="row" spacing={4}>
          <Button
            type="submit"
            colorScheme="blue"
            mt={4}
            width="full"
            size="lg"
          >
            Sign Up
          </Button>
          <Button
            type="submit"
            colorScheme="blue"
            mt={4}
            width="full"
            size="lg"
            as={Link}
            to="/"
          >
            Return to Login
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}

export default SignUpForm;
