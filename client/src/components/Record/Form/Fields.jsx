import {
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

function FormFields({ form, updateForm }) {
  return (
    <Stack spacing={4} maxW="2xl" mx="auto">
      <FormControl id="username">
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={form.username}
          onChange={(e) => updateForm({ username: e.target.value })}
          placeholder="Enter Username"
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input
          type="text"
          value={form.password}
          onChange={(e) => updateForm({ password: e.target.value })}
          placeholder="Enter Password"
        />
      </FormControl>
      <FormControl as="fieldset">
        <FormLabel as="legend">Position Options</FormLabel>
        <RadioGroup
          value={form.level}
          onChange={(value) => updateForm({ level: value })}
        >
          <Stack direction="row" spacing={4}>
            <Radio value="User">User</Radio>
            <Radio value="Employee">Employee</Radio>
            <Radio value="Admin">Admin</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}

export default FormFields;
