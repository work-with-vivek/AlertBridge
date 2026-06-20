import { useState } from "react";
import api from "../services/api";

import {
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert
} from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";

function ThreatIntelligence() {

    const [sector, setSector] = useState("");
    const [forecast, setForecast] = useState("");

    const predict = () => {

        api.post("/forecast", {
            sector: sector,
            exposed_data: "Email, PAN"
        })
            .then((response) => {
                setForecast(response.data.forecast);
            })
            .catch((error) => {
                console.error(error);
            });

    };

    return (

        <Paper
            sx={{
                p: 3,
                borderRadius: 5,
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(15px)",
                boxShadow: "0 15px 35px rgba(25,118,210,.12)",
                height: "100%"
            }}
        >

            <Box
                display="flex"
                alignItems="center"
                mb={2}
            >

                <PsychologyIcon
                    color="primary"
                    sx={{ mr: 1 }}
                />

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    Threat Intelligence
                </Typography>

            </Box>

            <TextField
                fullWidth
                label="Enter Sector (e.g. Banking, Telecom)"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                sx={{ mb: 2 }}
            />

            <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={predict}
            >
                Predict Threat
            </Button>

            {forecast && (

                <Alert
                    severity="info"
                    sx={{ mt: 3 }}
                >
                    {forecast}
                </Alert>

            )}

        </Paper>

    );

}

export default ThreatIntelligence;