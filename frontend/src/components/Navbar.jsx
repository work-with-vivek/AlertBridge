import { useEffect, useState } from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Avatar,
    Chip,
    Menu,
    MenuItem,
    Divider
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import SearchIcon from "@mui/icons-material/Search";

import api from "../services/api";

function Navbar() {

    const [notifications, setNotifications] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {

        loadNotifications();

        const interval = setInterval(() => {

            loadNotifications();

        }, 30000);

        return () => clearInterval(interval);

    }, []);

    const loadNotifications = async () => {

        try {

            const response = await api.get("/notifications");

            setNotifications(response.data);

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <AppBar
            position="fixed"
            elevation={2}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                bgcolor: "#fff",
                color: "#1e293b"
            }}
        >

            <Toolbar>

                <SecurityIcon
                    sx={{
                        color: "#1976d2",
                        mr: 1,
                        fontSize: 32
                    }}
                />

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        flexGrow: 1
                    }}
                >
                    AlertBridge SOC
                </Typography>

                <IconButton>

                    <SearchIcon />

                </IconButton>

                <IconButton
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                >

                    <Badge
                        badgeContent={notifications.length}
                        color="error"
                    >

                        <NotificationsIcon />

                    </Badge>

                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >

                    <Typography
                        sx={{
                            px: 2,
                            py: 1,
                            fontWeight: "bold"
                        }}
                    >
                        Notifications
                    </Typography>

                    <Divider />

                    {notifications.length === 0 ? (

                        <MenuItem>
                            No Notifications
                        </MenuItem>

                    ) : (

                        notifications.map((item, index) => (

                            <MenuItem key={index}>

                                <div>

                                    <Typography
                                        fontWeight="bold"
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                    >
                                        Severity : {item.severity}
                                    </Typography>

                                </div>

                            </MenuItem>

                        ))

                    )}

                </Menu>

                <Chip
                    label="System Secure"
                    color="success"
                    sx={{ mx: 3 }}
                />

                <Avatar
                    sx={{
                        bgcolor: "#1976d2"
                    }}
                >
                    {localStorage.getItem("username")?.charAt(0).toUpperCase()}
                </Avatar>

            </Toolbar>

        </AppBar>

    );

}

export default Navbar;