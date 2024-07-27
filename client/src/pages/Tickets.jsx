import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast, Box, Flex, Heading, Text, Textarea, Select } from "@chakra-ui/react";

import axios from "axios";
import SideBar from "../components/TicketSidebar";

export default function Tickets() {
  const toast = useToast();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // submission in progress (api route not implemented)
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log([selectedOption, description]);

    setLoading(true);
    if (!selectedOption || !description) {
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

    try {
      //dispatch(ticketSubmitStart());
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axios.post(`/api/user/ticket/${currentUser._id}`, { selectedOption, description }, config);

      const data = res.data;
      if (data.success === false) {
        // error message?
        setLoading(false);
      } else {
        toast({
          title: "Ticket Submitted",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        //dispatch(ticketSubmitSuccess(data));
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
      setLoading(false);
      //dispatch(ticketSubmitFailure(error.message));
    }
  };

  return (
    <Flex direction="row" height="100vh">
      <SideBar />
      <Flex width="100%" alignItems="center" justifyContent="center">
        <Box borderWidth="1px" rounded="lg" p={5} width="55%" boxShadow="0 5px 10px 0 rgba(158, 158, 158, 0.75)">
          <VStack spacing="20px" alignItems="flex-start">
            <Box borderBottomWidth="1px">
              <Heading>Create a Ticket</Heading>
              <Text fontSize="sm" color="gray.500">
                Please fill out all fields to submit a ticket
              </Text>
            </Box>
            <FormControl id="Username" isRequired pt="4px">
              <FormLabel>Category</FormLabel>
              <Select placeholder="Please Select an Option" onChange={(e) => setSelectedOption(e.target.value)}>
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
            <FormControl id="Description" isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea height="20vh" width="100%" resize="none" placeholder="Please describe your issue" onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
            <Button colorScheme="blue" mt={2} width="full" size="md" onClick={submitHandler} isLoading={loading}>
              Submit
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}
