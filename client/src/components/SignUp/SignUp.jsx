import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./Form/SignUpForm";

function SignUp() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      // Validate password matching
      if (form.password !== form.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Send POST request to backend signup route
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Clear form fields on successful signup
      setForm({
        username: "",
        password: "",
        confirmPassword: "",
      });

      // Navigate to login page after successful sign-up
      navigate("/");
    } catch (error) {
      console.error("Sign up failed:", error);
      // Handle error states or feedback to the user
    }
  }

  return <SignUpForm form={form} updateForm={updateForm} onSubmit={onSubmit} />;
}

export default SignUp;
