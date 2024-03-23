import fetch from "node-fetch";
import {ConfigService} from "../../../services/config.service";

/**
 * @swagger
 * /api/movies:
 *   get:
 *     description: Get a list of movies
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *     responses:
 *       200:
 *         description: Success Response
 *       500:
 *         description: Internal Server Error
 */
export default async function handler(req, res) {
    const page = parseInt(req.query.page, 10) || 1;
    const url = ConfigService.themoviedb.urls.movies.discover + `?page=${page}`;

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
    }
}