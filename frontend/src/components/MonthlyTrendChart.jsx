import { useEffect, useState } from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { Paper, Typography } from "@mui/material";

import api from "../services/api";

function MonthlyTrendChart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        api.get("/dashboard/monthly-trends")
            .then((response) => {
                setData(response.data);
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
                📈 Monthly Breach Trend
            </Typography>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#1976d2"
                        strokeWidth={3}
                        dot={{
                            r: 5,
                            fill: "#1976d2"
                        }}
                        activeDot={{
                            r: 8
                        }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </Paper>

    );

}

export default MonthlyTrendChart;