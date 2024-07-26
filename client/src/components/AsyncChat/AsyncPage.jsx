

/*
flex
    vstack
        box
            chats
        flex
            chatbox
            button
*/

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Heading, Flex, VStack, Spacer, Button} from "@chakra-ui/react";
import ChatBox from "./Parts/ChatBox";
import ChatLogs from "./Parts/ChatLogs"
import { API_URL } from "../../config";

export default function AsyncChat() {
  const [form, setForm] = useState({
    message: "",
  });
  const [chatLog, setChatLog] = useState({
    messages: [String],
    senders: [String],
  });
  const params = useParams();

  useEffect(() => {
    async function fetchData() { 
      const id = params.id?.toString() || undefined; // Replace with ticket ID
      if (!id) return;
      const response = await fetch(`${API_URL}/ticket/${params.id.toString()}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const ticket = await response.json();
      if (!ticket) {
        console.warn(`Ticket with id ${id} not found`);
        return;
      }
      setChatLog({messages: ticket.chatLog, senders: ticket.chatSender});
    }
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const message = { ...form };
    const sender = true; // Replace with check for employee/customer
    try {
      let response;
      if (sender) {
        response = await fetch(`${API_URL}/empMessage/:id`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
      } else {
        response = await fetch(`${API_URL}/custMessage/:id`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred sending this chat: ", error);
    } finally {
      setForm({ message: "" });
    }
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
        <VStack spacing={1} align='stretch'>
            <Box width="100%">
                <Heading as="h3" size="md" p={4}>
                Asyncronous Support
                </Heading>
                <ChatLogs chatLog={chatLog}/>
            </Box>
            <Flex>
                <ChatBox form={form} updateForm={updateForm}/>
                <Button
                    type="submit"
                    colorScheme="blue"
                    mt={4}
                    width="full"
                    size="md"
                >Send</Button>
            </Flex>
        </VStack>
    </Flex>
  );
}