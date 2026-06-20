import { Navigate } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <Navbar />

            <Sidebar />

            <Box
                component="main"
                sx={{
                    ml: "240px",
                    p: 3,
                    minHeight: "100vh",
                    bgcolor: "#f5f7fb"
                }}
            >
                <Toolbar />

                {children}

            </Box>
        </>
    );

}

export default Layout;