import { createTheme } from "@mui/material/styles";

const colors = {
  blue: { light: '#50d5d5', dark: '#45b4b4' },
  pink: { light: '#d86d95', dark: '#ae4c78'},
  red: { light: '#eb4b2b', dark: '#c73f24'},
  yellow: { light: '#fda026', dark: '#d78821' },
  rust: { light: '', dark: '#b95a2d6b'},
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
}
});