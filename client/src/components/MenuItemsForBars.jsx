import React from "react";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link to={to}>
      <Text display="block" _hover={{ textDecoration: "underline" }} {...rest}>
        {children}
      </Text>
    </Link>
  );
};

export default MenuItem;
