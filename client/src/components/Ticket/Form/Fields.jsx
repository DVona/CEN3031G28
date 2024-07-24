import {
  FormControl,
  FormLabel,
  Stack,
  Radio,
  RadioGroup,
  FormErrorMessage, FormHelperText,
  Textarea, 
} from "@chakra-ui/react";

function FormFields({ form, updateForm }) {
  //let isInvalid = form === "";
  return (
    <Stack spacing={4} maxW="2xl" mx="auto">
      <FormControl as="fieldset" id="category" isRequired>
        <FormLabel>Issue Type</FormLabel>
          <RadioGroup value={form.category} 
          onChange={(value) => updateForm({ category: value })}>
            <Stack>
              <Radio value='1'>Account Help</Radio>
              <Radio value='2'>Repair Request</Radio>
              <Radio value='3'>Bug Report</Radio>
              <Radio value='4'>Security Issue</Radio>
              <Radio value='5'>Other</Radio>
            </Stack>
          </RadioGroup>
          {/*!isInvalid ? (
            <FormHelperText></FormHelperText>
          ) : (
            <FormErrorMessage>Issue Type is required</FormErrorMessage>
          )*/}
      </FormControl>
      <FormControl id="description" isRequired>
        <FormLabel>Issue Description</FormLabel>
        <Textarea placeholder='Please describe the details of your issue' 
        value={form.description} onChange={(e) => updateForm({ description: e.target.value })} resize={'vertical'}/>
        {/*!isInvalid ? (
            <FormHelperText></FormHelperText>
          ) : (
            <FormErrorMessage>Issue description is required</FormErrorMessage>
          )*/}
      </FormControl>
    </Stack>
  );
}

export default FormFields;
