import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useToast, Box, Flex, Heading, Text, Textarea, Select } from "@chakra-ui/react";

import axios from "axios";

export default function CreateTicket() {
  const toast = useToast();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    //console.log([category, description]);

    setLoading(true);
    if (!category || !description) {
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
      const res = await axios.post('/api/ticket/create', { category, description }, config);
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

        //dispatch(ticketSubmitSuccess(data)); if i get around to it
        setLoading(false);
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
      <Flex height = "90vh" width="100%" alignItems="center" justifyContent="center">
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
              <Select placeholder="Please Select an Option" onChange={(e) => setCategory(e.target.value)}>
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
  );
}
