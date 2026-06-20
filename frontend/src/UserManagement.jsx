import { useEffect, useState } from "react";

import {
    Container,
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button
} from "@mui/material";

import Layout from "../components/Layout";
import api from "../services/api";

function UserManagement() {

    const [users, setUsers] = useState([]);

    const loadUsers = () => {

        api.get("/users/")
            .then((response) => {
                setUsers(response.data);
            })
            .catch(console.error);

    };

    useEffect(() => {
        loadUsers();
    }, []);

    const deleteUser = async (id) => {

        if (!window.confirm("Delete this user?"))
            return;

        await api.delete(`/users/${id}`);

        loadUsers();

    };

    return (

        <Layout>

            <Container maxWidth="lg">

                <Paper sx={{ p: 4 }}>

                    <Typography
                        variant="h4"
                        gutterBottom
                    >
                        User Management
                    </Typography>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>ID</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {users.map((user) => (

                                <TableRow key={user.id}>

                                    <TableCell>{user.id}</TableCell>

                                    <TableCell>{user.username}</TableCell>

                                    <TableCell>{user.role}</TableCell>

                                    <TableCell>{user.full_name}</TableCell>

                                    <TableCell>{user.email}</TableCell>

                                    <TableCell>
                                        {user.is_active ? "Active" : "Inactive"}
                                    </TableCell>

                                    <TableCell>

                                        <Button
                                            color="error"
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            Delete
                                        </Button>

                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </Paper>

            </Container>

        </Layout>

    );

}

export default UserManagement;