import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Alert
} from "@mui/material";

import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async () => {

        setError("");

        try {

            const response = await api.post("/login", {
                username,
                password
            });

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "username",
                response.data.username
            );

            navigate("/");

        } catch (err) {

            console.error(err);

            setError("Invalid Username or Password");

        }

    };

    return (

        <Container
            maxWidth="sm"
            sx={{ mt: 10 }}
        >

            <Paper
                sx={{
                    p: 4,
                    borderRadius: 4
                }}
            >

                <Typography
                    variant="h4"
                    gutterBottom
                    fontWeight="bold"
                >
                    AlertBridge Login
                </Typography>

                {error && (

                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>

                )}

                <TextField
                    fullWidth
                    margin="normal"
                    label="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            login();
                        }
                    }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={login}
                >
                    Login
                </Button>

            </Paper>

        </Container>

    );

}

export default Login;