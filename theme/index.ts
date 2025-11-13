import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: '#e76286',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#d4d4d4',
            secondary: '#999',
        },
    }
});