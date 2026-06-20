import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import api from "../services/api";

import { saveAs } from "file-saver";
import { exportToExcel } from "../utils/exportExcel";
import { exportToPdf } from "../utils/exportPdf";

import {
    Button,
    Container,
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    TextField,
    Chip,
    Box,
    TablePagination
} from "@mui/material";

function PublicRegistry() {

    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {

        api.get("/dashboard/registry")
            .then((response) => {

                setRows(response.data);

            })
            .catch(console.error);

    }, []);

    const filteredRows = rows.filter((row) =>

        row.company_name.toLowerCase().includes(search.toLowerCase()) ||

        row.sector.toLowerCase().includes(search.toLowerCase()) ||

        row.severity.toLowerCase().includes(search.toLowerCase())

    );

    const exportCSV = () => {

        const csv = [

            ["ID", "Company", "Sector", "Severity", "Date"],

            ...filteredRows.map((row) => [

                row.id,
                row.company_name,
                row.sector,
                row.severity,
                row.breach_date

            ])

        ]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob(
            [csv],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

        saveAs(blob, "AlertBridge_Registry.csv");

    };

    return (

        <Layout>

            <Container maxWidth="xl">

                <Paper sx={{ p: 3 }}>

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Public Breach Registry
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                            mb: 3
                        }}
                    >

                        <TextField
                            fullWidth
                            label="Search..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        <Button
                            variant="contained"
                            onClick={exportCSV}
                        >
                            CSV
                        </Button>

                        <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                                exportToExcel(filteredRows, "AlertBridge_Registry")
                            }
                        >
                            Excel
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            onClick={() =>
                                exportToPdf(filteredRows, "AlertBridge_Registry")
                            }
                        >
                            PDF
                        </Button>

                    </Box>

                    <TableContainer>

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell>ID</TableCell>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Sector</TableCell>
                                    <TableCell>Severity</TableCell>
                                    <TableCell>Date</TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {filteredRows
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row) => (

                                        <TableRow
                                            hover
                                            key={row.id}
                                        >

                                            <TableCell>{row.id}</TableCell>

                                            <TableCell>

                                                <Button
                                                    variant="text"
                                                    onClick={() =>
                                                        navigate(`/breach/${row.id}`)
                                                    }
                                                >
                                                    {row.company_name}
                                                </Button>

                                            </TableCell>

                                            <TableCell>
                                                {row.sector}
                                            </TableCell>

                                            <TableCell>

                                                <Chip
                                                    label={row.severity}
                                                    color={
                                                        row.severity === "Critical"
                                                            ? "error"
                                                            : row.severity === "High"
                                                                ? "warning"
                                                                : row.severity === "Medium"
                                                                    ? "info"
                                                                    : "success"
                                                    }
                                                />

                                            </TableCell>

                                            <TableCell>
                                                {row.breach_date}
                                            </TableCell>

                                        </TableRow>

                                    ))}

                            </TableBody>

                        </Table>

                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={filteredRows.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(e, newPage) =>
                            setPage(newPage)
                        }
                        onRowsPerPageChange={(e) => {

                            setRowsPerPage(
                                parseInt(e.target.value, 10)
                            );

                            setPage(0);

                        }}
                    />

                </Paper>

            </Container>

        </Layout>

    );

}

export default PublicRegistry;