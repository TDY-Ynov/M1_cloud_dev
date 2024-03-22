/**
 * @swagger
 * /api/movies/{idMovie}/videos:
 *   get:
 *     description: Get movie videos by ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie
 *     responses:
 *       200:
 *         description: Success Response
 *       404:
 *         description: Not Found
 *       405:
 *         description: Method Not Allowed
 */
import fetch from "node-fetch";
import { ConfigService } from "/services/config.service";

export default async function handler(req, res) {
    const idMovie = parseInt(req.query.idMovie, 10);
    const url = ConfigService.themoviedb.urls.movies.movie + `/${idMovie}/videos`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
        }
    };

    switch (req.method) {
        case "GET":
            const apiResponse = await fetch(url, options)
                .then(r => r.json())
                .then(data => data.results.map(video => ({
                    ...video,
                    youtubeUrl: `${ConfigService.youtube.urls.getVideo}?v=${video.key}`
                })))
                .catch(err => console.error('error:' + err));
            if (apiResponse && apiResponse.length > 0) {
                res.json({ status: 200, data: apiResponse });
            } else {
                res.status(404).json({ status: 404, error: "Not Found" });
            }
            break;

        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
