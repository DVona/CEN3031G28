import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function Create() {
  const navigate = useNavigate();

  const handleCreate = () => {
    // localStorage.removeItem("token"); 

    navigate("/create");
  };

return (
    <Button onClick={handleCreate} colorScheme ="white" variant="outline" size="sm">
      Create User
    </Button>
  );
}

export default Create;
