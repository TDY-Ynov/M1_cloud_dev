import fetch from "node-fetch";
import { ConfigService } from "/services/config.service";

/**
 * @swagger
 * /api/movies/search:
 *   get:
 *     description: Search movies by query
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search query string
 *     responses:
 *       200:
 *         description: Success Response
 *       400:
 *         description: Bad Request
 *       405:
 *         description: Method Not Allowed
 */

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            try {
                const { query } = req.query;

                if (!query) {
                    res.status(400).json({ status: 400, error: "Bad Request", message: "Missing 'query' parameter." });
                    return;
                }

                const url = `${ConfigService.themoviedb.urls.movies.search}?query=${encodeURIComponent(query)}`;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
                    }
                };

                const apiResponse = await fetch(url, options).then(r => r.json());
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
