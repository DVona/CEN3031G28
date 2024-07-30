import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack, } from "@chakra-ui/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast, Box, Flex, Heading, Text, Select } from "@chakra-ui/react";

import axios from "axios";

export default function Tickets() {
  const toast = useToast();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /*
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
  */
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box borderWidth="1px" rounded="lg" p={5} width="55%" boxShadow="0 5px 10px 0 rgba(158, 158, 158, 0.75)">
        <VStack spacing="20px" alignItems="flex-start">
          <Box borderBottomWidth="1px">
            <Heading>Fill Out a Ticket</Heading>
            <Text fontSize="sm" color="gray.500">
              Please fill out all fields to submit a ticket
            </Text>
          </Box>
          <FormControl id="Username" isRequired pt="4px">
            <FormLabel>Category</FormLabel>
            <Select placeholder="Please Select an Option">
              {/*
              {/*way to add the placeholder without making it an options (will throw error warning into console (can ignore))}
              <option selected hidden disabled value="">
                Placeholder
              </option>
              */}
              <option value="Account Help">Account Help</option>
              <option value="Repair Request">Repair Request</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Security ">Security Issue</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>

          {/* In Progress */}

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" />
          </FormControl>
          <FormControl id="Confirm Password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="confirmPassword" placeholder="Confirm Password" />
          </FormControl>

          {/* End of In Progress */}

          <Button colorScheme="blue" mt={2} width="full" size="md" /*onClick={submitHandler}*/>
            Submit
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
