import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";
import RecordForm from "./Form/RecordForm";
import { API_URL } from "../../config";

export default function Record() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    level: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(`${API_URL}/record/${params.id.toString()}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
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
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch(`${API_URL}/record`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        response = await fetch(`${API_URL}/record/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem occurred adding or updating a record: ", error);
    } finally {
      setForm({ username: "", password: "", level: "" });
      navigate("/records");
    }
  }

  return (
    <Box>
      <Heading as="h3" size="lg" p={4}>
        Create/Update User Information
      </Heading>
      <RecordForm form={form} updateForm={updateForm} onSubmit={onSubmit} />
    </Box>
  );
}
