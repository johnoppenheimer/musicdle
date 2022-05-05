import axios from 'axios';

const deezerClient = axios.create({
    baseURL: 'https://api.deezer.com',
});

export default deezerClient;
