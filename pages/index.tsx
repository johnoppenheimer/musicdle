import type { NextPage } from 'next';
import Head from 'next/head';
import DeezerPlayer from '../components/DeezerPlayer';

const Home: NextPage = () => (
	<div>
		<Head>
			<title>Musicdle</title>
			<meta name="description" content="Create blindtest for your friends"/>
			<link rel="icon" href="/favicon.ico"/>
		</Head>
		<div>
			<h2>Hello World</h2>
			<DeezerPlayer/>
		</div>
	</div>
);

export default Home;
