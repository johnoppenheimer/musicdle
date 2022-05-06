import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';

import MainLayout from '../components/layouts/MainLayout';
import store from '../store';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
            {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools />}
        </QueryClientProvider>
    </Provider>
);

export default MyApp;
