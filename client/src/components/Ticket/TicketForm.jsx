import { useState, useEffect } from "react";
import { Stack, Radio, Box, Button, Flex, RadioGroup, Textarea, FormControl, 
  FormLabel, Heading, Text, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

function TicketForm({ form, updateForm, onSubmit}) {
  //const categories = {1:"AccountHelp", 2:"RepairRequest", 3:"BugReport", 4:"SecurityIssue", 5:"Other"}
  const isInvalid = form === "";
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
        <Stack spacing={4} maxW="2xl" mx="auto">
          <FormControl isInvalid={isInvalid} id="category">
            <FormLabel>Issue Type</FormLabel>
              <RadioGroup value={form.category} onChange={(value) => updateForm({ category: value })}>
                <Stack>
                  <Radio value='1'>Account Help</Radio>
                  <Radio value='2'>Repair Request</Radio>
                  <Radio value='3'>Bug Report</Radio>
                  <Radio value='4'>Security Issue</Radio>
                  <Radio value='5'>Other</Radio>
                </Stack>
              </RadioGroup>
              {!isInvalid ? (
                <FormHelperText></FormHelperText>
              ) : (
                <FormErrorMessage>Issue Type is required</FormErrorMessage>
              )}
          </FormControl>
          <FormControl isInvalid={isInvalid} id="description">
            <FormLabel>Issue Description</FormLabel>
            <Textarea placeholder='Please describe the details of your issue' 
            value={form.description} onChange={(e) => updateForm({ desription: e.target.value })} resize={'vertical'}/>
            {!isInvalid ? (
                <FormHelperText></FormHelperText>
              ) : (
                <FormErrorMessage>Issue description is required</FormErrorMessage>
              )}
          </FormControl>
        </Stack>
      </Flex>
      <Button type="submit" colorScheme="blue" mt={4} width="full" size="lg">
        Submit Ticket
      </Button>
    </Box>
  );
}

export default function Ticket() {
  const [form, setForm] = useState({
    category: "",
    details: "",
  });
  const navigate = useNavigate();
/*
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      const response = await fetch(`${API_URL}/ticket/${params.id.toString()}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/ticket");
        return;
      }
      setForm(record);
    }
    fetchData();
  }, [params.id, navigate]);
*/
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const ticket = { ...form };
    try {
      let response = await fetch(`${API_URL}/ticket/ticketCountUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred adding a ticket: ", error);
    } finally {
      setForm({ category: "", description: "" });
      navigate("/ticket/");
    }
  }

  return (
    <Box>
      <Heading as="h3" size="lg" p={4}>
        Enter Issue Details
      </Heading>
      <TicketForm form={form} updateForm={updateForm} onSubmit={onSubmit} />
    </Box>
  );
}