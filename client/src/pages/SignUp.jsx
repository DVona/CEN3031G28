import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack, HStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast, Box, Flex, Heading, Text } from "@chakra-ui/react";

import axios from "axios";

export default function SignIn() {
  const toast = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (!username || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const res = await axios.post("/api/auth/signup", { username, password }, config);
      const data = res.data;
      if (data.success === false) {
        // error message?
        setLoading(false);
        return;
      }

      toast({
        title: "Sign Up Successful",
        description: "Please sign in to continue",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
      navigate("/");
    } catch (error) {
      // this will usually occur because of duplicate usernames (other case would be form sanitization)
      // cannot show actual error message as it will expose database information
      toast({
        title: "Error Occured!",
        description: "Username is not allowed",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box borderWidth="1px" rounded="lg" p={5} width="55%" boxShadow="0 5px 10px 0 rgba(158, 158, 158, 0.75)">
        <VStack spacing="20px" alignItems="flex-start">
          <Box borderBottomWidth="1px">
            <Heading>Sign Up for an Account</Heading>
            <Text fontSize="sm" color="gray.500">
              Please enter a username and password to create an account.
            </Text>
          </Box>
          <FormControl id="Username" isRequired pt="4px">
            <FormLabel>Username</FormLabel>
            <Input value={username} placeholder="Enter Your Username" onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" />
          </FormControl>
          <FormControl id="Confirm Password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="confirmPassword" placeholder="Confirm Password" />
          </FormControl>
          <HStack width="100%" justifyContent="center" spacing="20px">
            <Button colorScheme="blue" mt={2} width="full" size="md" onClick={submitHandler} isLoading={loading}>
              Sign Up
            </Button>
            <Button colorScheme="blue" mt={2} width="full" size="md" onClick={() => navigate("/")}>
              Return to Login
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
}
