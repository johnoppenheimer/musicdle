import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
    <QueryClientProvider client={queryClient}>
        <Component {...pageProps}/>
        {process.env.NODE_ENV !== 'production' && (
            <ReactQueryDevtools />
        )}
    </QueryClientProvider>
);

export default MyApp;
