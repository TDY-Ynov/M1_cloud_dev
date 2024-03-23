import fetch from "node-fetch";
import {ConfigService} from "/services/config.service";

/**
 * @swagger
 * /api/movies/discover/toprated:
 *   get:
 *     description: Get a list of top rated movies
 *     responses:
 *       200:
 *         description: Success Response
 *       405:
 *         description: Method Not Allowed
 *       500:
 *         description: Internal Server Error
 */

export default async function handler(req, res) {
    const url = `${ConfigService.themoviedb.urls.movies.movie}/top_rated`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
        }
    };

    switch (req.method) {
        case "GET":
            try {
                const apiResponse = await fetch(url, options).then(r => r.json());
                res.json({status: 200, data: apiResponse.results});
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({status: 500, error: 'Internal Server Error'});
            }
            break;

        default:
            res.status(405).json({status: 405, error: "Method Not Allowed"});
    }
}
