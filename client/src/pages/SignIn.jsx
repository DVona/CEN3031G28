import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack, HStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { signInStart, signInSucess, signInFailure } from "../redux/user/userSlice";

import axios from "axios";

export default function SignIn() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return dispatch(signInFailure("Please fill all fields"));
    }

    try {
      dispatch(signInStart());
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const res = await axios.post("/api/auth/signin", { username, password }, config);
      const data = res.data;
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      } else {
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        dispatch(signInSucess(data));
        navigate("/dashboard");
      }
    } catch (error) {
      // shows backend error message
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box borderWidth="1px" rounded="lg" p={5} width="40%" boxShadow="0 5px 10px 0 rgba(158, 158, 158, 0.75)">
        <VStack spacing="20px" alignItems="flex-start">
          <Box borderBottomWidth="1px">
            <Heading>Sign Into Account</Heading>
            <Text fontSize="sm" color="gray.500">
              Please enter your username and password to login.
            </Text>
          </Box>
          <FormControl id="Username" isRequired pt="4px">
            <FormLabel>Username</FormLabel>
            <Input value={username} type="username" placeholder="Enter Your Username" onChange={(e) => setUsername(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type={show ? "text" : "password"} placeholder="Enter password" />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <HStack width="100%" justifyContent="center" spacing="20px">
            <Button colorScheme="blue" mt={2} width="full" size="md" onClick={submitHandler} isLoading={loading}>
              Login
            </Button>
            <Button colorScheme="blue" mt={2} width="full" size="md" onClick={() => navigate("/sign-up")}>
              Sign Up
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
}
