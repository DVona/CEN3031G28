import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./Form/LoginForm";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const credentials = { ...form };
    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Login successful:", data);
      navigate("/records"); // Redirect after successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return <LoginForm form={form} updateForm={updateForm} onSubmit={onSubmit} />;
}
