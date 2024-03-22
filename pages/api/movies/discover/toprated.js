import fetch from "node-fetch";
import { ConfigService } from "/services/config.service";

/**
 * @swagger
 * /api/movies/discover/toprated:
 *   get:
 *     description: Get a list of top rated movies
 *     responses:
 *       200:
 *         description: Success Response
 *       500:
 *         description: Internal Server Error
 *       405:
 *         description: Method Not Allowed
 */

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            try {
                const url = `${ConfigService.themoviedb.urls.movies.movie}/top_rated`;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
                    }
                };

                const apiResponse = await fetch(url, options).then(r => r.json());

                console.log(apiResponse)
                res.json({ status: 200, data: apiResponse.results });
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ status: 500, error: 'Internal Server Error' });
            }
            break;

        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
