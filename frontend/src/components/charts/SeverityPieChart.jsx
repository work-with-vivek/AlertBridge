import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const COLORS = [
    "#ef4444",
    "#f59e0b",
    "#3b82f6",
    "#22c55e"
];

function SeverityPieChart({ data }) {

    return (

        <ResponsiveContainer
            width="100%"
            height={320}
        >

            <PieChart>

                <Pie
                    data={data}
                    dataKey="total"
                    nameKey="severity"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
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

    );

}

export default SeverityPieChart;