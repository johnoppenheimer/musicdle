import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';
import deezerClient from '../../../libraries/deezer/client';
import { DeezerSearchResponse } from '../../../libraries/deezer/type';

const paramsSchema = Yup.object().shape({
    q: Yup.string().typeError('the query must be a string').required('query required'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405);
    }

    const params = await paramsSchema.validate(req.query);

    const deezerResponse = await deezerClient.get<DeezerSearchResponse>('/search', {
        params: {
            q: params.q,
        },
    });

    return res.status(200).json(deezerResponse.data);
}
