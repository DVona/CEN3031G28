import { Box, Flex, Spacer, VStack, } from "@chakra-ui/react";
import { useState } from "react";

const EmpEntry = (props) => (
    <Flex>
        <Box size='md' colorScheme='green'>
        {props.message}
        </Box>
        <Spacer/>
    </Flex>
);
  
const CustEntry = (props) => (
    <Flex>
        <Spacer/>
        <Box size='md' colorScheme='blue'>
        {props.message}
        </Box>
    </Flex>
);

export default function ChatLog(chatLog) {

    function displayEntry(entry) {
        if (entry.sender == 1){
            return <EmpEntry
                message={entry.message}
            />
        }
        else {
            return <CustEntry
                message={entry.message}
            />
        }
    }

    function listChats(chatLog) {
        let [logs, setLogs] = useState([]);
        for (let entry of chatLog){
            logs.push(displayEntry(entry));
        }
        return logs;
    }

    return (
        <Box width="100%" borderWidth="1px" rounded="lg" overflow="hidden">
          <VStack>{listChats(chatLog)}</VStack>
        </Box>
      );
    }

