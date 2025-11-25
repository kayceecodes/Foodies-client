import { createTheme } from "@mui/material/styles";

const colors = {
  blue: { light: '#50d5d5', dark: '#45b4b4' },
  pink: { light: '#d86d95', dark: '#ae4c78'},
  red: { light: '#eb4b2b', dark: '#c73f24'},
  yellow: { light: '#fda026', dark: '#d78821' },
  rust: { light: '#d86e3e6b', dark: '#b95a2d6b'},
  charcoal: { light: '#4e4e4e', medium: '#404040', dark: '#333333'},
  neutral: { light: '#525252', medium: '#404040', dark: '#262626'},
}

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: colors.blue.dark },
    secondary: { main: colors.rust.dark },
    text: { primary: '#fff' },
    background: { default: colors.charcoal.medium},
  },
  components: {
  MuiTextField: {
    defaultProps: {
      variant: "outlined",
      fullWidth: true,
    },
  },
  MuiInput: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.neutral.medium,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.neutral.light,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.blue.dark, 
        },
        '& input': {
          color: '#fff',
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: '#ccc',

        '&.Mui-focused': {
          color: colors.blue.dark,
        },
      },
    },
  },
  MuiButton: {
    variants: [
      {
        props: { variant: 'contained' },  // custom variant
        style: {
          border: "0.9px solid #78716caa",
          borderRadius: "8px",
          color: "#d1d5dc",
          background: "linear-gradient(to top,#47bebe 5%, rgb(59, 151, 151) 80%)",
          transition: "color 0.15s ease-in",
          '&:hover': {
            color: "#fff"
          }
        }
      }
    ],
    styleOverrides:{
       root: {
        '&.<className>': {
        }
      }
    }
  }
}
});