import fetch from "node-fetch";
import clientPromise from "../../../../lib/mongodb";
import {ConfigService} from "../../../../src/services/config.service";

/**
 * @swagger
 * /api/movies/{idMovie}:
 *   get:
 *     description: Get movie data by ID
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
 *       500:
 *         description: Internal Server Error
 */

export default async function handler(req, res) {
    const idMovie = parseInt(req.query.idMovie, 10);
    const url = ConfigService.themoviedb.urls.movies.movie + '/' + idMovie;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN
        }
    };
    const client = await clientPromise;
    const db = client.db("ynov-cloud");
    switch (req.method) {
        case "GET":
            try {
                let movie = await fetch(url, options)
                    .then(r => r.json())

                const likes = await db.collection("likes").findOne({idTMDB: idMovie});
                if (movie && movie.success !== false) {
                    movie = {
                        ...movie,
                        likes: likes ? likes.likeCounter : 0,
                    };
                    res.json({status: 200, data: {movie: movie}});
                } else {
                    res.status(404).json({status: 404, error: "Not Found"});
                }
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({status: 500, error: 'Internal Server Error'});
            }
            break;
        default:
            res.status(405).json({status: 405, error: "Method Not Allowed"});
    }
}