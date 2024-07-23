import { Box, Button, Flex, RadioGroup, Textarea, FormControl, FormLabel, useState, useEffect } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";
import { API_URL } from "../../config";


function TicketForm({ form, updateForm, onSubmit}) {
  const categories = {1:"AccountHelp", 2:"RepairRequest", 3:"BugReport", 4:"SecurityIssue", 5:"Other"}
  return (
    <Box as="form" onSubmit={onSubmit} borderWidth="1px" rounded="lg" p={4}>
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="flex-start"
        borderBottomWidth="1px"
        pb={12}
        mb={4}
      >
        <FormHeader />
        <FormFields form={form} updateForm={updateForm} />
        <FormControl isInvalid={missingSelection}>
          <FormLabel>Issue Type</FormLabel>
            <RadioGroup onChange={updateForm({ category: value })} value={categories[value]}>
              <Stack>
                <Radio value='1'>Account Help</Radio>
                <Radio value='2'>Repair Request</Radio>
                <Radio value='3'>Bug Report</Radio>
                <Radio value='4'>Security Issue</Radio>
                <Radio value='5'>Other</Radio>
              </Stack>
            </RadioGroup>
            {!missingSelection ? (
              <FormHelperText></FormHelperText>
            ) : (
              <FormErrorMessage>Issue Type is required</FormErrorMessage>
            )}
        </FormControl>
        <FormControl isInvalid={missingSelection}>
          <FormLabel>Issue Description</FormLabel>
          <Textarea placeholder='Please describe the details of your issue' 
          value={input} onChange={updateForm({ description: value })} resize={vertical}/>
          {!missingSelection ? (
              <FormHelperText>
              </FormHelperText>
            ) : (
              <FormErrorMessage>Issue description is required</FormErrorMessage>
            )}
        </FormControl>
      </Flex>
      <Button type="submit" colorScheme="blue" mt={4} width="full" size="lg">
        Submit Ticket
      </Button>
    </Box>
  );
}

export default function Ticket() {
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  
  async function onSubmit(e) {
    e.preventDefault();
    const ticket = { ...form };
    try {
      let response= await fetch(`${API_URL}/ticket/ticketCountUp`, {
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
      setForm({ username: "", password: "", level: "" });
      navigate("/ticket");
    }
  }

  const [form, setForm] = useState({
    category: "",
    details: "",
  });
  const params = useParams();
  const navigate = useNavigate();
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

  return (
    <Box>
      <Heading as="h3" size="lg" p={4}>
        Enter Issue Details
      </Heading>
      <TicketForm form={form} updateForm={updateForm} onSubmit={onSubmit} />
    </Box>
  );
}