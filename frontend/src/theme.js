import { createTheme } from "@mui/material/styles";

const darkMode = localStorage.getItem("darkMode") === "true";

const theme = createTheme({

    palette: {

        mode: darkMode ? "dark" : "light",

        primary: {
            main: "#1565c0",
        },

        secondary: {
            main: "#00acc1",
        },

        background: darkMode
            ? {
                default: "#121212",
                paper: "#1e1e1e",
            }
            : {
                default: "#f5f7fb",
                paper: "#ffffff",
            },

    },

    shape: {
        borderRadius: 12,
    },

    typography: {

        fontFamily: "Inter, Roboto, Arial, sans-serif",

        h4: {
            fontWeight: 700,
        },

        h5: {
            fontWeight: 600,
        },

    },

});

export default theme;