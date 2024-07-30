import { Flex, Box, VStack, Text, Input, FormControl, Button, useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";

import { updateStart, updateSuccess, updateFailure } from "../redux/user/userSlice";

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser.username || "");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();

  const submitHandler = async (e) => {
    e.preventDefault();
    // Modify handler and api routes to allow for either a username or password to be updated independently
    if (!username || !password) {
      toast({
        title: "Please Fill out all Fields to Update User",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      dispatch(updateStart());
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axios.put(`/api/user/update/${currentUser._id}`, { username, password }, config);
      const data = res.data;
      if (data.success === false) {
        dispatch(updateFailure(data.message));
      } else {
        toast({
          title: "Updated User",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        dispatch(updateSuccess(data));
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      dispatch(updateFailure(error.message));
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box borderWidth="1px" rounded="lg" p={5} width="40%" boxShadow="0 5px 10px 0 rgba(158, 158, 158, 0.75)">
        <VStack spacing="20px" alignItems="center">
          <Text as="u" fontWeight="bold" fontSize="4xl">
            {currentUser.username}'s Profile
          </Text>
          <FormControl id="Username" pt="4px" width="100%">
            <Input  value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          </FormControl>
          <FormControl id="Password" pt="4px">
            <Input  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </FormControl>
          <Box w="100%" textAlign="left">
            <Text>Your Role: {currentUser.role}</Text>
          </Box>
          <Button colorScheme="blue" mt={2} width="full" size="md" onClick={submitHandler}>
            Update
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
