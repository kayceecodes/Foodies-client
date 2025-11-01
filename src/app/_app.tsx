import CustomProvider from '@/redux/CustomProvider'
import store from '@/redux/store';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export default function App({ Component, pageProps }: AppProps) {
    // Create a client
    const queryClient = new QueryClient()

    return(
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
    );
    
};
