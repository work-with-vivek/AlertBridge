import { useEffect, useState } from "react";

import {
    Container,
    Typography,
    Grid,
    Paper,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Divider,
    CircularProgress,
    Box
} from "@mui/material";

import SecurityIcon from "@mui/icons-material/Security";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import BusinessIcon from "@mui/icons-material/Business";

import Layout from "../components/Layout";
import api from "../services/api";

function SecurityAnalytics() {

    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {

        loadAnalytics();

    }, []);

    const loadAnalytics = async () => {

        try {

            const response = await api.get("/analytics/overview");

            setAnalytics(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    if (!analytics) {

        return (

            <Layout>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 8
                    }}
                >

                    <CircularProgress />

                </Box>

            </Layout>

        );

    }

    return (

        <Layout>

            <Container maxWidth="xl">

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ mb: 4 }}
                >
                    Security Analytics
                </Typography>

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Card>

                            <CardContent>

                                <SecurityIcon
                                    color="primary"
                                    sx={{
                                        fontSize: 40,
                                        mb: 1
                                    }}
                                />

                                <Typography variant="h6">
                                    Total Breaches
                                </Typography>

                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                >
                                    {analytics.total_breaches}
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Card>

                            <CardContent>

                                <WarningAmberIcon
                                    color="warning"
                                    sx={{
                                        fontSize: 40,
                                        mb: 1
                                    }}
                                />

                                <Typography variant="h6">
                                    High Risk
                                </Typography>

                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                >
                                    {analytics.high}
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>

                        <Card>

                            <CardContent>

                                <ReportProblemIcon
                                    color="error"
                                    sx={{
                                        fontSize: 40,
                                        mb: 1
                                    }}
                                />

                                <Typography variant="h6">
                                    Critical Risk
                                </Typography>

                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                >
                                    {analytics.critical}
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                </Grid>

                <Grid
                    container
                    spacing={3}
                    sx={{ mt: 3 }}
                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Paper sx={{ p: 3 }}>

                            <Typography
                                variant="h6"
                                gutterBottom
                            >
                                Top Targeted Sectors
                            </Typography>

                            <Divider sx={{ mb: 2 }} />

                            <List>

                                {analytics.top_sectors.map((sector) => (

                                    <ListItem
                                        key={sector.sector}
                                    >

                                        <BusinessIcon
                                            color="primary"
                                            sx={{ mr: 2 }}
                                        />

                                        <ListItemText
                                            primary={sector.sector}
                                            secondary={`${sector.count} breaches`}
                                        />

                                    </ListItem>

                                ))}

                            </List>

                        </Paper>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Paper
                            sx={{
                                p: 3,
                                height: "100%"
                            }}
                        >

                            <Typography
                                variant="h6"
                                gutterBottom
                            >
                                Executive Summary
                            </Typography>

                            <Divider sx={{ mb: 2 }} />

                            <Typography paragraph>

                                AlertBridge has detected
                                <b> {analytics.total_breaches} </b>
                                total breaches in the registry.

                            </Typography>

                            <Typography paragraph>

                                <b>{analytics.critical}</b> incidents are
                                classified as Critical.

                            </Typography>

                            <Typography paragraph>

                                <b>{analytics.high}</b> incidents are
                                classified as High Risk.

                            </Typography>

                            <Typography>

                                The sectors listed on the left currently
                                represent the highest concentration of
                                reported security incidents.

                            </Typography>

                        </Paper>

                    </Grid>

                </Grid>

            </Container>

        </Layout>

    );

}

export default SecurityAnalytics;