import CustomProvider from '@/redux/CustomProvider'
import store from '@/redux/store';
import { AppProps } from 'next/app';
import { AuthProvider } from '../../hooks/useAuth';

export default function App({ Component, pageProps }: AppProps) {
    return(
            <>
                <Component {...pageProps} />
            </>
    );
    
};
