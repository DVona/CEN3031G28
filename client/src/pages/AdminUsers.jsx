import { Flex, Box, VStack, Text, Input, FormControl, Button, useToast, HStack } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Users() {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser?.role === "Admin";
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`/api/user/getusers`);
        const data = res.data;

        setUsers(data.users);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await axios.get(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.data;

      setUsers((prev) => [...prev, ...data.users]);
      if (data.users.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await axios.delete(`/api/user/delete/${userIdToDelete}`);
      const data = await res.data;
      if (data.success === false) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Flex height="relative" justifyContent="center" mt="10" mb="10">
      <Box borderWidth="1px" rounded="lg" p={5} width="80%" boxShadow="0 5px 10px 0 rgba(158, 158, 158, 0.75)">
        {isAdmin && users.length > 0 ? (
          <>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Date created</Th>
                    <Th>Username</Th>
                    <Th>Role</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                {users.map((user) => (
                  <Tbody key={user._id}>
                    <Tr>
                      <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
                      <Td>{user.username}</Td>
                      <Td>{user.role}</Td>
                      <Td>
                        <Button
                          color="red"
                          variant="link"
                          onClick={() => {
                            setShowModal(true);
                            setUserIdToDelete(user._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  </Tbody>
                ))}
              </Table>
              <Flex justifyContent="center" mt="3">
                {showMore && (
                  <Button variant="link" onClick={handleShowMore}>
                    Show more
                  </Button>
                )}
              </Flex>
            </TableContainer>
          </>
        ) : (
          <Link to="/sign-up-admin">
            <Text _hover={{ textDecoration: "underline" }}>Somehow No Users Exist. Create Some?</Text>
          </Link>
        )}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> Are You Sure?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this user?</ModalBody>

            <ModalFooter>
              <HStack align="center">
                <Button bg="red" mr="3" onClick={handleDeleteUser}>
                  Yes, I'm sure
                </Button>
                <Button onClick={() => setShowModal(false)}>No, cancel</Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}
