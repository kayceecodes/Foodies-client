import CustomProvider from '@/redux/CustomProvider'
import store from '@/redux/store';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return(
        <CustomProvider store={store}>
           <Component {...pageProps} />
        </CustomProvider> 
    );
    
};
