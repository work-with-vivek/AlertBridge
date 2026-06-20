import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function MonthlyTrendChart({ data }) {

    return (

        <ResponsiveContainer
            width="100%"
            height={320}
        >

            <LineChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    dataKey="month"
                />

                <YAxis />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#1976d2"
                    strokeWidth={3}
                />

            </LineChart>

        </ResponsiveContainer>

    );

}

export default MonthlyTrendChart;