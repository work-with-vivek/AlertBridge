import {
    Container,
    Paper,
    Typography,
    Switch,
    FormControlLabel,
    Divider,
    Button,
    TextField,
    Stack,
    Snackbar,
    Alert
} from "@mui/material";

import { useState } from "react";

import Layout from "../components/Layout";

function Settings() {

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    const [refreshRate, setRefreshRate] = useState(
        localStorage.getItem("refreshRate") || 30
    );

    const [success, setSuccess] = useState(false);

    const saveSettings = () => {

        localStorage.setItem("darkMode", darkMode);

        localStorage.setItem(
            "refreshRate",
            refreshRate
        );

        setSuccess(true);

        setTimeout(() => {

            window.location.reload();

        }, 800);

    };

    return (

        <Layout>

            <Container maxWidth="md">

                <Paper sx={{ p: 4 }}>

                    <Typography
                        variant="h4"
                        gutterBottom
                    >
                        System Settings
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <Stack spacing={3}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={darkMode}
                                    onChange={(e) =>
                                        setDarkMode(e.target.checked)
                                    }
                                />
                            }
                            label="Dark Mode"
                        />

                        <TextField
                            label="Dashboard Refresh (seconds)"
                            type="number"
                            value={refreshRate}
                            onChange={(e) =>
                                setRefreshRate(e.target.value)
                            }
                        />

                        <Button
                            variant="contained"
                            onClick={saveSettings}
                        >
                            Save Settings
                        </Button>

                    </Stack>

                </Paper>

            </Container>

            <Snackbar
                open={success}
                autoHideDuration={1500}
                onClose={() => setSuccess(false)}
            >
                <Alert
                    severity="success"
                    variant="filled"
                >
                    Settings Saved Successfully
                </Alert>
            </Snackbar>

        </Layout>

    );

}

export default Settings;