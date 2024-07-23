import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function TicketButton() {
  const navigate = useNavigate();

  const handleCreate = () => {

    navigate("/ticket/form");
  };

return (
    <Button onClick={handleCreate} colorScheme ="white" variant="outline" size="sm">
      Submit Ticket
    </Button>
  );
}

export default TicketButton;
