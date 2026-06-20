import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import api from "../services/api";

import {
    Container,
    Typography,
    Paper,
    CircularProgress,
    Box
} from "@mui/material";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function AttackMap() {

    const [breaches, setBreaches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadMap();

    }, []);

    const loadMap = async () => {

        try {

            const response = await api.get("/attack-map");

            setBreaches(response.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    return (

        <Layout>

            <Container maxWidth="xl">

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ mb: 3 }}
                >
                    Global Cyber Attack Map
                </Typography>

                <Paper sx={{ p: 2 }}>

                    {loading ? (

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                py: 8
                            }}
                        >
                            <CircularProgress />
                        </Box>

                    ) : (

                        <MapContainer
                            center={[20.5937, 78.9629]}
                            zoom={4}
                            style={{
                                height: "650px",
                                width: "100%"
                            }}
                        >

                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {breaches.map((item) => (

                                <Marker
                                    key={item.id}
                                    position={[
                                        item.latitude,
                                        item.longitude
                                    ]}
                                >

                                    <Popup>

                                        <b>{item.company}</b>

                                        <br />

                                        Sector:
                                        {" "}
                                        {item.sector}

                                        <br />

                                        Severity:
                                        {" "}
                                        {item.severity}

                                    </Popup>

                                </Marker>

                            ))}

                        </MapContainer>

                    )}

                </Paper>

            </Container>

        </Layout>

    );

}

export default AttackMap;