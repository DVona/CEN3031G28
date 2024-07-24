import {
    FormControl,
    Textarea, 
    Box,
  } from "@chakra-ui/react";
  
  function ChatBox({ form, updateForm }) {
    //let isInvalid = form === "";
    return (
      <Box width="80%">
        <FormControl id="message" isRequired>
          <Textarea placeholder='Type message here' 
          value={form.description} onChange={(e) => updateForm({ description: e.target.value })} resize={'vertical'}/>
          {/*!isInvalid ? (
              <FormHelperText></FormHelperText>
            ) : (
              <FormErrorMessage>Issue description is required</FormErrorMessage>
            )*/}
        </FormControl>
      </Box>
    );
  }
  
  export default ChatBox;