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
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Stack
} from "@mui/material";

import Layout from "../components/Layout";
import api from "../services/api";

function UserManagement() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "analyst",
        full_name: "",
        email: ""
    });

    const loadUsers = async () => {

        try {

            const response = await api.get("/users/");

            setUsers(response.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

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

    const createUser = async () => {

        try {

            await api.post("/users/", form);

            setOpen(false);

            setForm({
                username: "",
                password: "",
                role: "analyst",
                full_name: "",
                email: ""
            });

            loadUsers();

        } catch (err) {

            alert("Unable to create user");

        }

    };

    return (

        <Layout>

            <Container maxWidth="lg">

                <Paper sx={{ p: 4 }}>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        mb={3}
                    >

                        <Typography variant="h4">
                            User Management
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={() => setOpen(true)}
                        >
                            Add User
                        </Button>

                    </Stack>

                    {loading ? (

                        <CircularProgress />

                    ) : (

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell>ID</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Action</TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {users.map((user) => (

                                    <TableRow key={user.id}>

                                        <TableCell>{user.id}</TableCell>

                                        <TableCell>{user.username}</TableCell>

                                        <TableCell>{user.full_name}</TableCell>

                                        <TableCell>{user.email}</TableCell>

                                        <TableCell>

                                            <Chip
                                                label={user.role}
                                                color={
                                                    user.role === "admin"
                                                        ? "error"
                                                        : user.role === "analyst"
                                                            ? "primary"
                                                            : "success"
                                                }
                                            />

                                        </TableCell>

                                        <TableCell>

                                            <Chip
                                                label={
                                                    user.is_active
                                                        ? "Active"
                                                        : "Inactive"
                                                }
                                                color={
                                                    user.is_active
                                                        ? "success"
                                                        : "default"
                                                }
                                            />

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

                    )}

                </Paper>

            </Container>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
            >

                <DialogTitle>
                    Create User
                </DialogTitle>

                <DialogContent>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        value={form.username}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                username: e.target.value
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                password: e.target.value
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Full Name"
                        value={form.full_name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                full_name: e.target.value
                            })
                        }
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value
                            })
                        }
                    />

                    <TextField
                        select
                        fullWidth
                        margin="normal"
                        label="Role"
                        value={form.role}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                role: e.target.value
                            })
                        }
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="analyst">Analyst</MenuItem>
                        <MenuItem value="auditor">Auditor</MenuItem>
                    </TextField>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={createUser}
                    >
                        Create
                    </Button>

                </DialogActions>

            </Dialog>

        </Layout>

    );

}

export default UserManagement;