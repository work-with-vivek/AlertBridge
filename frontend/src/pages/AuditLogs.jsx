import { useEffect, useState } from "react";
import {
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";

import Layout from "../components/Layout";
import api from "../services/api";

function AuditLogs() {

    const [logs, setLogs] = useState([]);

    useEffect(() => {

        loadLogs();

    }, []);

    const loadLogs = async () => {

        try {

            const response = await api.get("/audit");

            setLogs(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <Layout>

            <Paper sx={{ p: 3 }}>

                <Typography
                    variant="h5"
                    gutterBottom
                >
                    Audit Logs
                </Typography>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>ID</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Timestamp</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {logs.map((log) => (

                            <TableRow key={log.id}>

                                <TableCell>{log.id}</TableCell>
                                <TableCell>{log.username}</TableCell>
                                <TableCell>{log.action}</TableCell>
                                <TableCell>{log.created_at}</TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </Paper>

        </Layout>

    );

}

export default AuditLogs;