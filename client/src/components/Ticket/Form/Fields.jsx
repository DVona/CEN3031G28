import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

function Fields({ form, updateForm }) {
  return (
    <Stack spacing={4} width="75%">
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
          type="password"
          value={form.password}
          onChange={(e) => updateForm({ password: e.target.value })}
          placeholder="Enter Password"
        />
      </FormControl>
      <FormControl id="confirmPassword">
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          value={form.confirmPassword}
          onChange={(e) => updateForm({ confirmPassword: e.target.value })}
          placeholder="Confirm Password"
        />
      </FormControl>
    </Stack>
  );
}

export default Fields;
