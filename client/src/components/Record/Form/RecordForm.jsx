import { Box, Button, Flex } from "@chakra-ui/react";
import FormHeader from "./Header";
import FormFields from "./Fields";

function RecordForm({ form, updateForm, onSubmit }) {
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
      </Flex>
      <Button type="submit" colorScheme="blue" mt={4} width="full" size="lg">
        Save User Record
      </Button>
    </Box>
  );
}

export default RecordForm;
