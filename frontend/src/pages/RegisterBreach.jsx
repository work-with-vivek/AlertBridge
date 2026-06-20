import { useState } from "react";
import api from "../services/api";

import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    Snackbar,
    Alert,
    Box,
    Grid
} from "@mui/material";

import SecurityIcon from "@mui/icons-material/Security";
import Layout from "../components/Layout";

const locations = {
    Banking: { lat: 28.6139, lon: 77.2090 },
    Telecom: { lat: 19.0760, lon: 72.8777 },
    Healthcare: { lat: 13.0827, lon: 80.2707 },
    Education: { lat: 22.5726, lon: 88.3639 },
    Government: { lat: 23.2599, lon: 77.4126 },
    IT: { lat: 12.9716, lon: 77.5946 }
};

function RegisterBreach() {

    const [form, setForm] = useState({
        company_name: "",
        sector: "",
        exposed_data: "",
        country: "India",
        city: "",
        breach_date: "",
        affected_records: "",
        latitude: "",
        longitude: ""
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        let updated = {
            ...form,
            [name]: value
        };

        if (name === "sector" && locations[value]) {

            updated.latitude = locations[value].lat;
            updated.longitude = locations[value].lon;

        }

        setForm(updated);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/breach/register", form);

            setSuccess(true);

            setForm({
                company_name: "",
                sector: "",
                exposed_data: "",
                country: "India",
                city: "",
                breach_date: "",
                affected_records: "",
                latitude: "",
                longitude: ""
            });

        } catch (err) {

            console.error(err);
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
                        background: "rgba(255,255,255,0.85)",
                        backdropFilter: "blur(12px)"
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

                        <Grid container spacing={2}>

                            <Grid size={{ xs: 12 }}>

                                <TextField
                                    fullWidth
                                    label="Company Name"
                                    name="company_name"
                                    value={form.company_name}
                                    onChange={handleChange}
                                    required
                                />

                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    select
                                    fullWidth
                                    label="Sector"
                                    name="sector"
                                    value={form.sector}
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="Banking">Banking</MenuItem>
                                    <MenuItem value="Telecom">Telecom</MenuItem>
                                    <MenuItem value="Healthcare">Healthcare</MenuItem>
                                    <MenuItem value="Education">Education</MenuItem>
                                    <MenuItem value="Government">Government</MenuItem>
                                    <MenuItem value="IT">IT</MenuItem>
                                </TextField>

                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                />

                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    label="Country"
                                    name="country"
                                    value={form.country}
                                    onChange={handleChange}
                                />

                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>

                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Incident Date"
                                    name="breach_date"
                                    value={form.breach_date}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />

                            </Grid>

                            <Grid size={{ xs: 12 }}>

                                <TextField
                                    fullWidth
                                    label="Affected Records"
                                    name="affected_records"
                                    value={form.affected_records}
                                    onChange={handleChange}
                                />

                            </Grid>

                            <Grid size={{ xs: 12 }}>

                                <TextField
                                    multiline
                                    rows={5}
                                    fullWidth
                                    label="Exposed Data"
                                    name="exposed_data"
                                    value={form.exposed_data}
                                    onChange={handleChange}
                                />

                            </Grid>

                            <Grid size={{ xs: 12 }}>

                                <Button
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 3
                                    }}
                                >
                                    Register Breach
                                </Button>

                            </Grid>

                        </Grid>

                    </form>

                </Paper>

            </Container>

            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
            >
                <Alert
                    severity="success"
                    variant="filled"
                >
                    Breach Registered Successfully
                </Alert>
            </Snackbar>

            <Snackbar
                open={error}
                autoHideDuration={3000}
                onClose={() => setError(false)}
            >
                <Alert
                    severity="error"
                    variant="filled"
                >
                    Failed to Register Breach
                </Alert>
            </Snackbar>

        </Layout>

    );

}

export default RegisterBreach;