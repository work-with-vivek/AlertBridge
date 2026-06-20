import { useEffect, useState } from "react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

import { Paper, Typography } from "@mui/material";

import api from "../services/api";

function SectorChart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        api.get("/dashboard/sectors")
            .then((response) => {

                const chartData = Object.entries(response.data).map(
                    ([sector, total]) => ({
                        sector,
                        total
                    })
                );

                setData(chartData);

            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

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

            <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
            >
                🏢 Sector Analytics
            </Typography>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="sector" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="total"
                        fill="#1976d2"
                        radius={[8, 8, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </Paper>

    );

}

export default SectorChart;