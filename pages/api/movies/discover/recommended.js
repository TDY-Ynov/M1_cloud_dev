import fetch from "node-fetch";
import clientPromise from "../../../../lib/mongodb";
import {ConfigService} from "../../../../src/services/config.service";


/**
 * @swagger
 * /api/movies/discover/recommended:
 *   get:
 *     description: Get a list of recommended movies based on liked movies
 *     responses:
 *       200:
 *         description: Success Response
 *       405:
 *         description: Method Not Allowed
 *       500:
 *         description: Internal Server Error
 */
export default async function handler(req, res) {
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
                const client = await clientPromise;
                const db = client.db("ynov-cloud");


                const likedMovies = await db.collection("likes").find({likeCounter: {$gt: 0}}).toArray();

                if (likedMovies.length === 0) {
                    res.json({status: 200, data: []});
                    return;
                }
                const genresForLikedMovies = [];

                for (const movie of likedMovies) {
                    const url = ConfigService.themoviedb.urls.movies.movie + '/' + movie.idTMDB;

                    const movieDetailsResponse = await fetch(url, options).then(r => r.json());

                    if (!movieDetailsResponse.genres) {
                        console.error('Error: No genres found for movie with ID', movie.idTMDB);
                        continue;
                    }

                    const genreIds = movieDetailsResponse.genres.map(genre => genre.id);

                    genresForLikedMovies.push(...genreIds);
                }

                const uniqueGenreIds = [...new Set(genresForLikedMovies)];

                if (uniqueGenreIds.length === 0) {
                    res.json({status: 200, data: []});
                    return;
                }

                const genreQueryString = uniqueGenreIds.length > 0 ? `with_genres=${uniqueGenreIds.join(',')}` : '';

                const discoverUrl = `${ConfigService.themoviedb.urls.movies.discover}?${genreQueryString}`;

                const discoverApiResponse = await fetch(discoverUrl, options).then(r => r.json());
                res.json({status: 200, data: discoverApiResponse.results});
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({status: 500, error: 'Internal Server Error'});
            }
            break;

        default:
            res.status(405).json({status: 405, error: "Method Not Allowed"});
    }
}
