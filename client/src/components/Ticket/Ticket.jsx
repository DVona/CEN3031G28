import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Heading, Flex } from "@chakra-ui/react";
import TicketForm from "./Form/TicketForm";

function Ticket() {
    const API_URL="http://localhost:5050";
    const [form, setForm] = useState({
      category: "",
      description: "",
    });
    //const params = useParams();
    const navigate = useNavigate();
  /*
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
        const categories = {1:"AccountHelp", 2:"RepairRequest", 3:"BugReport", 4:"SecurityIssue", 5:"Other"};
        e.preventDefault();
        try {
        
            let response = await fetch(`${API_URL}/ticket/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                category: categories[form.category],
                chatLog: form.description,
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("A problem occurred adding a ticket: ", error);
      } finally {
        setForm({ category: "", description: "" });
        navigate("/ticket/all");
      }
    }
    if (!form) {
        console.error("Ticket created undefined form prop");
        return null;
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

  export default Ticket;