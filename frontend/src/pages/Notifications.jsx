import { useEffect, useState } from "react";

import {
    Container,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Chip,
    Divider,
    CircularProgress,
    Box
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import Layout from "../components/Layout";
import api from "../services/api";

function Notifications() {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications = async () => {

        try {

            const response = await api.get("/notifications");

            setNotifications(response.data);

        } catch (error) {

            console.error("Failed to load notifications:", error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <Layout>

            <Container maxWidth="lg">

                <Paper sx={{ p: 3 }}>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Notification Center
                    </Typography>

                    {loading ? (

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                py: 4
                            }}
                        >
                            <CircularProgress />
                        </Box>

                    ) : (

                        <List>

                            {notifications.length === 0 ? (

                                <Typography
                                    align="center"
                                    color="text.secondary"
                                    sx={{ py: 3 }}
                                >
                                    No notifications available.
                                </Typography>

                            ) : (

                                notifications.map((item, index) => (

                                    <Box key={index}>

                                        <ListItem>

                                            <NotificationsActiveIcon
                                                color="primary"
                                                sx={{ mr: 2 }}
                                            />

                                            <ListItemText
                                                primary={
                                                    item.message ||
                                                    item.title ||
                                                    "Notification"
                                                }
                                                secondary={
                                                    item.created_at ||
                                                    item.date ||
                                                    "Just now"
                                                }
                                            />

                                            <Chip
                                                label={item.severity || "Info"}
                                                color={
                                                    item.severity === "Critical"
                                                        ? "error"
                                                        : item.severity === "High"
                                                            ? "warning"
                                                            : item.severity === "Medium"
                                                                ? "info"
                                                                : "success"
                                                }
                                            />

                                        </ListItem>

                                        <Divider />

                                    </Box>

                                ))

                            )}

                        </List>

                    )}

                </Paper>

            </Container>

        </Layout>

    );

}

export default Notifications;