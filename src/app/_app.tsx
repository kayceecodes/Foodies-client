import CustomProvider from '@/redux/CustomProvider'
import store from '@/redux/store';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StyledEngineProvider, ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from '../../theme';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
        }
    }
})

export default function App({ Component, pageProps }: AppProps) {

    return(
        <QueryClientProvider client={queryClient}>
            <CustomProvider store={store}>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </CustomProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
    
};
