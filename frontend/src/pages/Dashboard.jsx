import { useEffect, useState } from "react";
import {
    Container,
    Grid,
    Typography,
    Snackbar,
    Alert
} from "@mui/material";

import SecurityIcon from "@mui/icons-material/Security";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import SectorChart from "../components/SectorChart";
import ThreatIntelligence from "../components/ThreatIntelligence";
import RecentBreaches from "../components/RecentBreaches";

import MonthlyTrendChart from "../components/charts/MonthlyTrendChart";
import SeverityPieChart from "../components/charts/SeverityPieChart";

import { connectSocket, disconnectSocket } from "../services/socket";
import api from "../services/api";

function Dashboard() {

    const [stats, setStats] = useState({
        total_breaches: 0,
        high_risk: 0,
        critical_risk: 0
    });

    const [monthlyData, setMonthlyData] = useState([]);
    const [severityData, setSeverityData] = useState([]);

    const [lastUpdated, setLastUpdated] = useState(new Date());

    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "info"
    });

    const loadDashboard = async () => {

        try {

            const [
                statsRes,
                monthlyRes,
                severityRes
            ] = await Promise.all([
                api.get("/dashboard/stats"),
                api.get("/dashboard/monthly-trends"),
                api.get("/dashboard/severity-chart")
            ]);

            setStats(statsRes.data);
            setMonthlyData(monthlyRes.data);
            setSeverityData(severityRes.data);
            setLastUpdated(new Date());

        } catch (error) {

            console.error("Dashboard Error:", error);

        }

    };

    useEffect(() => {

        loadDashboard();

        connectSocket((message) => {

            console.log("WebSocket:", message);

            if (message.type === "new_breach") {

                loadDashboard();

                setNotification({
                    open: true,
                    message: message.message,
                    severity:
                        message.severity === "Critical"
                            ? "error"
                            : message.severity === "High"
                                ? "warning"
                                : "info"
                });

            }

        });

        const interval = setInterval(() => {

            loadDashboard();

        }, 30000);

        return () => {

            clearInterval(interval);
            disconnectSocket();

        };

    }, []);

    return (

        <Layout>

            <Container maxWidth="xl">

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                        mb: 1,
                        color: "primary.main"
                    }}
                >
                    AlertBridge Security Operations Center
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Last Updated: {lastUpdated.toLocaleTimeString()}
                </Typography>

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <DashboardCard
                            title="Total Breaches"
                            value={stats.total_breaches}
                            icon={<SecurityIcon fontSize="inherit" />}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <DashboardCard
                            title="High Risk"
                            value={stats.high_risk}
                            icon={<WarningAmberIcon fontSize="inherit" />}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <DashboardCard
                            title="Critical Risk"
                            value={stats.critical_risk}
                            icon={<ReportProblemIcon fontSize="inherit" />}
                        />
                    </Grid>

                </Grid>

                <Grid
                    container
                    spacing={3}
                    sx={{ mt: 2 }}
                >

                    <Grid size={{ xs: 12, md: 6 }}>
                        <MonthlyTrendChart
                            data={monthlyData}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <SeverityPieChart
                            data={severityData}
                        />
                    </Grid>

                </Grid>

                <Grid
                    container
                    spacing={3}
                    sx={{ mt: 2 }}
                >

                    <Grid size={{ xs: 12, md: 7 }}>
                        <SectorChart />
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <ThreatIntelligence />
                    </Grid>

                </Grid>

                <Grid sx={{ mt: 2 }}>
                    <RecentBreaches />
                </Grid>

                <Snackbar
                    open={notification.open}
                    autoHideDuration={5000}
                    onClose={() =>
                        setNotification((prev) => ({
                            ...prev,
                            open: false
                        }))
                    }
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                >
                    <Alert
                        severity={notification.severity}
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>

            </Container>

        </Layout>

    );

}

export default Dashboard;