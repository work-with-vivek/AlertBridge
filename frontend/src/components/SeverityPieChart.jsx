import { useEffect, useState } from "react";
import api from "../services/api";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import {
    Paper,
    Typography
} from "@mui/material";

const COLORS = [
    "#1976d2",
    "#ef5350",
    "#66bb6a",
    "#ffb300"
];

function SeverityPieChart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        api.get("/dashboard/severity-chart")
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
                🥧 Severity Distribution
            </Typography>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="total"
                        nameKey="severity"
                        outerRadius={100}
                        innerRadius={50}
                        paddingAngle={4}
                        label
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </Paper>

    );

}

export default SeverityPieChart;