import type { NextPage } from 'next';
import Head from 'next/head';
import MainLayout from '../components/layouts/MainLayout';
import DeezerAutocomplete from '../components/pages/home/DeezerAutocomplete';

const Home: NextPage = () => (
    <MainLayout>
        <Head>
            <title>Musicdle</title>
            <meta name="description" content="Create blindtest for your friends" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="py-2">
            <h2 className="text-xl">Create daily musicle for your friends</h2>
            <DeezerAutocomplete />
        </div>
    </MainLayout>
);

export default Home;
