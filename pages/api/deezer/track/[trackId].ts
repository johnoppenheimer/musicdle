import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';
import deezerClient from '../../../../libraries/deezer/client';
import { DeezerTrack } from '../../../../libraries/deezer/type';

const paramsSchema = Yup.object().shape({
    trackId: Yup.string().typeError('the trackId must be a string').required('trackId required'),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405);
    }

    const params = await paramsSchema.validate(req.query);

    const deezerResponse = await deezerClient.get<DeezerTrack>('/track/' + params.trackId);

    return res.status(200).json(deezerResponse.data);
}
