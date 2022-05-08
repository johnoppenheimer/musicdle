import type { NextPage } from 'next';
import Head from 'next/head';
import DeezerAutocomplete from '../components/pages/home/DeezerAutocomplete';

const Home: NextPage = () => (
    <div>
        <Head>
            <title>Musicdle</title>
            <meta name="description" content="Create blindtest for your friends" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="py-2">
            <h2 className="text-2xl my-8">Search a music and create a musicdle!</h2>
            <DeezerAutocomplete />
        </div>
    </div>
);

export default Home;
