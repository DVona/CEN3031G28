import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem("token"); 

    navigate("/");
  };

  return (
    <Button onClick={handleLogout} colorScheme ="white" variant="outline" size="sm">
      Logout
    </Button>
  );
}

export default Logout;
