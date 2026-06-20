import { useEffect, useState } from "react";

import {
    Container,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Chip,
    Divider,
    CircularProgress,
    Box,
    TextField,
    MenuItem
} from "@mui/material";

import Layout from "../components/Layout";
import api from "../services/api";

function Intelligence() {

    const [threats, setThreats] = useState([]);
    const [filteredThreats, setFilteredThreats] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [severity, setSeverity] = useState("All");

    useEffect(() => {

        loadThreats();

    }, []);

    useEffect(() => {

        let data = threats;

        if (severity !== "All") {

            data = data.filter(
                t => t.severity === severity
            );

        }

        if (search !== "") {

            data = data.filter(
                t =>
                    t.title
                        .toLowerCase()
                        .includes(search.toLowerCase())
            );

        }

        setFilteredThreats(data);

    }, [search, severity, threats]);

    const loadThreats = async () => {

        try {

            const response =
                await api.get("/threat-feed");

            setThreats(response.data);
            setFilteredThreats(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <Layout>

            <Container maxWidth="lg">

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ mb: 3 }}
                >
                    Threat Intelligence Center
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        mb: 3
                    }}
                >

                    <TextField
                        fullWidth
                        label="Search Threat"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <TextField
                        select
                        label="Severity"
                        value={severity}
                        onChange={(e) =>
                            setSeverity(e.target.value)
                        }
                        sx={{ width: 180 }}
                    >

                        <MenuItem value="All">
                            All
                        </MenuItem>

                        <MenuItem value="Critical">
                            Critical
                        </MenuItem>

                        <MenuItem value="High">
                            High
                        </MenuItem>

                        <MenuItem value="Medium">
                            Medium
                        </MenuItem>

                    </TextField>

                </Box>

                <Paper sx={{ p: 2 }}>

                    {loading ? (

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                p: 4
                            }}
                        >

                            <CircularProgress />

                        </Box>

                    ) : (

                        <List>

                            {filteredThreats.map((item, index) => (

                                <div key={index}>

                                    <ListItem>

                                        <ListItemText
                                            primary={item.title}
                                            secondary={item.source}
                                        />

                                        <Chip
                                            label={item.severity}
                                            color={
                                                item.severity === "Critical"
                                                    ? "error"
                                                    : item.severity === "High"
                                                        ? "warning"
                                                        : "info"
                                            }
                                        />

                                    </ListItem>

                                    <Divider />

                                </div>

                            ))}

                        </List>

                    )}

                </Paper>

            </Container>

        </Layout>

    );

}

export default Intelligence;