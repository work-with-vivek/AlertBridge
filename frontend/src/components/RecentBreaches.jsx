import { useState } from "react";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    Snackbar,
    Alert,
    Box
} from "@mui/material";

import SecurityIcon from "@mui/icons-material/Security";

import Layout from "../components/Layout";
import api from "../services/api";

function RegisterBreach() {

    const [form, setForm] = useState({
        company_name: "",
        sector: "",
        exposed_data: ""
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/breach/register", form);

            setSuccess(true);

            setForm({
                company_name: "",
                sector: "",
                exposed_data: ""
            });

        } catch {

            setError(true);

        }

    };

    return (

        <Layout>

            <Container maxWidth="md">

                <Paper
                    sx={{
                        p: 4,
                        borderRadius: 5,
                        background: "rgba(255,255,255,.75)",
                        backdropFilter: "blur(15px)",
                        boxShadow: "0 15px 35px rgba(25,118,210,.12)"
                    }}
                >

                    <Box
                        display="flex"
                        alignItems="center"
                        mb={3}
                    >

                        <SecurityIcon
                            color="primary"
                            sx={{ mr: 1 }}
                        />

                        <Typography
                            variant="h5"
                            fontWeight="bold"
                        >
                            Register Cyber Breach
                        </Typography>

                    </Box>

                    <form onSubmit={handleSubmit}>

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Company Name"
                            name="company_name"
                            value={form.company_name}
                            onChange={handleChange}
                        />

                        <TextField
                            select
                            fullWidth
                            margin="normal"
                            label="Sector"
                            name="sector"
                            value={form.sector}
                            onChange={handleChange}
                        >
                            <MenuItem value="Banking">Banking</MenuItem>
                            <MenuItem value="Telecom">Telecom</MenuItem>
                            <MenuItem value="Healthcare">Healthcare</MenuItem>
                            <MenuItem value="Education">Education</MenuItem>
                            <MenuItem value="Government">Government</MenuItem>
                            <MenuItem value="IT">IT</MenuItem>
                        </TextField>

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            label="Exposed Data"
                            name="exposed_data"
                            value={form.exposed_data}
                            onChange={handleChange}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                mt: 3,
                                py: 1.5,
                                borderRadius: 3
                            }}
                        >
                            Register Breach
                        </Button>

                    </form>

                </Paper>

            </Container>

            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success">
                    Breach Registered Successfully
                </Alert>
            </Snackbar>

            <Snackbar
                open={error}
                autoHideDuration={3000}
                onClose={() => setError(false)}
            >
                <Alert severity="error">
                    Registration Failed
                </Alert>
            </Snackbar>

        </Layout>

    );

}

export default RegisterBreach;