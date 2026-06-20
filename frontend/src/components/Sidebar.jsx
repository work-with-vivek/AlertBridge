import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
    Typography,
    Avatar,
    Chip
} from "@mui/material";

import {
    Dashboard,
    Assessment,
    AddCircle,
    VerifiedUser,
    Psychology,
    Public,
    Notifications,
    Map,
    People,
    History,
    Settings,
    Logout
} from "@mui/icons-material";

import { Link, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    const username = localStorage.getItem("username") || "User";
    const role = localStorage.getItem("role") || "";

    const logout = () => {

        localStorage.clear();
        navigate("/login", { replace: true });

    };

    const menuItems = [

        {
            text: "Dashboard",
            icon: <Dashboard />,
            path: "/"
        },

        {
            text: "Notifications",
            icon: <Notifications />,
            path: "/notifications"
        },

        {
            text: "Security Analytics",
            icon: <Assessment />,
            path: "/analytics"
        },

        {
            text: "Attack Map",
            icon: <Map />,
            path: "/attack-map"
        },

        {
            text: "Register Breach",
            icon: <AddCircle />,
            path: "/register"
        },

        {
            text: "Compliance",
            icon: <VerifiedUser />,
            path: "/compliance"
        },

        {
            text: "Threat Intelligence",
            icon: <Psychology />,
            path: "/intelligence"
        },

        {
            text: "Public Registry",
            icon: <Public />,
            path: "/public"
        }

    ];

    if (role === "admin") {

        menuItems.push(

            {
                text: "User Management",
                icon: <People />,
                path: "/users"
            },

            {
                text: "Audit Logs",
                icon: <History />,
                path: "/audit"
            },

            {
                text: "Settings",
                icon: <Settings />,
                path: "/settings"
            }

        );

    }

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "#0f172a",
                    color: "#ffffff"
                }
            }}
        >

            <Box sx={{ mt: 8 }}>

                <Box
                    sx={{
                        textAlign: "center",
                        p: 2
                    }}
                >

                    <Avatar
                        sx={{
                            width: 60,
                            height: 60,
                            bgcolor: "#1976d2",
                            margin: "auto"
                        }}
                    >
                        {username.charAt(0).toUpperCase()}
                    </Avatar>

                    <Typography
                        variant="h6"
                        sx={{ mt: 1 }}
                    >
                        {username}
                    </Typography>

                    <Chip
                        label={role.toUpperCase()}
                        color={
                            role === "admin"
                                ? "error"
                                : role === "analyst"
                                    ? "primary"
                                    : "success"
                        }
                        size="small"
                    />

                </Box>

                <Divider sx={{ bgcolor: "#334155", mb: 2 }} />

                <List>

                    {menuItems.map((item) => (

                        <ListItem
                            key={item.text}
                            disablePadding
                        >

                            <ListItemButton
                                component={Link}
                                to={item.path}
                                selected={location.pathname === item.path}
                                sx={{
                                    mx: 1,
                                    borderRadius: 2,

                                    "&.Mui-selected": {
                                        backgroundColor: "#1976d2"
                                    },

                                    "&:hover": {
                                        backgroundColor: "#1e293b"
                                    }
                                }}
                            >

                                <ListItemIcon
                                    sx={{
                                        color: "#ffffff",
                                        minWidth: 40
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.text}
                                />

                            </ListItemButton>

                        </ListItem>

                    ))}

                </List>

                <Divider sx={{ bgcolor: "#334155", my: 2 }} />

                <List>

                    <ListItem disablePadding>

                        <ListItemButton
                            onClick={logout}
                            sx={{
                                mx: 1,
                                borderRadius: 2,

                                "&:hover": {
                                    backgroundColor: "#dc2626"
                                }
                            }}
                        >

                            <ListItemIcon
                                sx={{
                                    color: "#ffffff",
                                    minWidth: 40
                                }}
                            >
                                <Logout />
                            </ListItemIcon>

                            <ListItemText primary="Logout" />

                        </ListItemButton>

                    </ListItem>

                </List>

            </Box>

        </Drawer>

    );

}

export default Sidebar;