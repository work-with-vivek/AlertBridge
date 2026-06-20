import { useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

import {
    Container,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Button,
    Snackbar,
    Alert
} from "@mui/material";

function Compliance() {

    const [form, setForm] = useState({
        breachId: "",
        notification_status: "",
        notification_date: "",
        evidence_status: ""
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const updateCompliance = async () => {

        try {

            await api.put(
                `/breach/compliance/${form.breachId}`,
                {
                    notification_status: form.notification_status,
                    notification_date: form.notification_date,
                    evidence_status: form.evidence_status
                }
            );

            setSuccess(true);

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <Layout>

            <Container maxWidth="sm">

                <Paper sx={{ p: 4 }}>

                    <Typography
                        variant="h5"
                        gutterBottom
                    >
                        Compliance Management
                    </Typography>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Breach ID"
                        name="breachId"
                        value={form.breachId}
                        onChange={handleChange}
                    />

                    <TextField
                        select
                        fullWidth
                        margin="normal"
                        label="Notification Status"
                        name="notification_status"
                        value={form.notification_status}
                        onChange={handleChange}
                    >
                        <MenuItem value="Completed">
                            Completed
                        </MenuItem>

                        <MenuItem value="Pending">
                            Pending
                        </MenuItem>
                    </TextField>

                    <TextField
                        fullWidth
                        margin="normal"
                        type="date"
                        name="notification_date"
                        value={form.notification_date}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                    <TextField
                        select
                        fullWidth
                        margin="normal"
                        label="Evidence Status"
                        name="evidence_status"
                        value={form.evidence_status}
                        onChange={handleChange}
                    >
                        <MenuItem value="Submitted">
                            Submitted
                        </MenuItem>

                        <MenuItem value="Pending">
                            Pending
                        </MenuItem>
                    </TextField>

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3 }}
                        onClick={updateCompliance}
                    >
                        Update Compliance
                    </Button>

                </Paper>

            </Container>

            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success">
                    Compliance Updated Successfully
                </Alert>
            </Snackbar>

        </Layout>

    );

}

export default Compliance;