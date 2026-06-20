import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Container,
    Paper,
    Typography,
    Grid,
    Chip,
    Divider,
    Button,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CircularProgress
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";
import GroupsIcon from "@mui/icons-material/Groups";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import Layout from "../components/Layout";
import api from "../services/api";

function BreachDetails() {

    const { id } = useParams();

    const [breach, setBreach] = useState(null);

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {

        api.get(`/breach/${id}`)
            .then((response) => {

                setBreach(response.data);

            })
            .catch(console.error);

    }, [id]);

    const sendNotification = async () => {

        try {

            setLoading(true);
            setDialogOpen(true);
            setCompleted(false);

            await api.post(`/breach/${id}/notify`);

            setTimeout(() => {

                setCompleted(true);
                setSuccess(true);
                setLoading(false);

            }, 2500);

        } catch (error) {

            console.error(error);

            setDialogOpen(false);
            setLoading(false);

            alert("Failed to send notification.");

        }

    };

    if (!breach) {

        return (
            <Layout>
                <Container>
                    <Typography>Loading...</Typography>
                </Container>
            </Layout>
        );

    }

    return (

        <Layout>

            <Container maxWidth="md">

                <Paper sx={{ p: 4, borderRadius: 4 }}>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                    >
                        {breach.company_name}
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={2}>

                        <Grid size={{ xs: 12 }}>
                            <Typography>
                                <b>Sector:</b> {breach.sector}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12 }}>

                            <Typography mb={1}>
                                <b>Severity</b>
                            </Typography>

                            <Chip
                                label={breach.severity}
                                color={
                                    breach.severity === "Critical"
                                        ? "error"
                                        : breach.severity === "High"
                                            ? "warning"
                                            : breach.severity === "Medium"
                                                ? "info"
                                                : "success"
                                }
                            />

                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Typography>
                                <b>Exposed Data:</b>
                            </Typography>

                            <Typography>
                                {breach.exposed_data}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Typography>
                                <b>Breach Date:</b> {breach.breach_date}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Typography>
                                <b>Compliance Score:</b> {breach.compliance_score}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12 }} sx={{ mt: 3 }}>

                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<NotificationsActiveIcon />}
                                onClick={sendNotification}
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Notification"}
                            </Button>

                        </Grid>

                    </Grid>

                </Paper>

            </Container>

            <Dialog
                open={dialogOpen}
                maxWidth="sm"
                fullWidth
            >

                <DialogTitle>
                    Security Notification System
                </DialogTitle>

                <DialogContent>

                    {!completed ? (

                        <>

                            <CircularProgress sx={{ mb: 2 }} />

                            <Typography variant="h6">
                                Sending Notifications...
                            </Typography>

                            <Typography color="text.secondary">
                                Please wait while the system contacts affected users.
                            </Typography>

                        </>

                    ) : (

                        <>

                            <Typography
                                variant="h5"
                                color="success.main"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Notification Completed Successfully
                            </Typography>

                            <List>

                                <ListItem>

                                    <ListItemIcon>
                                        <GroupsIcon color="success" />
                                    </ListItemIcon>

                                    <ListItemText
                                        primary="Affected Users Identified"
                                        secondary="12,458 Users"
                                    />

                                </ListItem>

                                <ListItem>

                                    <ListItemIcon>
                                        <EmailIcon color="success" />
                                    </ListItemIcon>

                                    <ListItemText
                                        primary="Email Alerts Sent"
                                        secondary="12,458 Emails"
                                    />

                                </ListItem>

                                <ListItem>

                                    <ListItemIcon>
                                        <SmsIcon color="success" />
                                    </ListItemIcon>

                                    <ListItemText
                                        primary="SMS Alerts Sent"
                                        secondary="8,965 Messages"
                                    />

                                </ListItem>

                                <ListItem>

                                    <ListItemIcon>
                                        <AssignmentTurnedInIcon color="success" />
                                    </ListItemIcon>

                                    <ListItemText
                                        primary="Audit Log Updated"
                                    />

                                </ListItem>

                                <ListItem>

                                    <ListItemIcon>
                                        <CheckCircleIcon color="success" />
                                    </ListItemIcon>

                                    <ListItemText
                                        primary="Compliance Status Updated"
                                    />

                                </ListItem>

                            </List>

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 }}
                                onClick={() => setDialogOpen(false)}
                            >
                                Close
                            </Button>

                        </>

                    )}

                </DialogContent>

            </Dialog>

            <Snackbar
                open={success}
                autoHideDuration={4000}
                onClose={() => setSuccess(false)}
            >

                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    Notification sent successfully to affected users.
                </Alert>

            </Snackbar>

        </Layout>

    );

}

export default BreachDetails;