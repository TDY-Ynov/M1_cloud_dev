import clientPromise from "/lib/mongodb";

/**
 * @swagger
 * /api/movies/{idMovie}/likes:
 *   patch:
 *     description: Update like status for a movie by ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie
 *     responses:
 *       201:
 *         description: Like status updated
 *       405:
 *         description: Method Not Allowed
 *   get:
 *     description: Get like status for a movie by ID
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

export default async function handler(req, res) {
    const idMovie = parseInt(req.query.idMovie, 10);
    const client = await clientPromise;
    const db = client.db("ynov-cloud");
    switch (req.method) {
        case "PATCH":
            const like = await db.collection("likes").findOne({idTMDB: idMovie});
            let resMongo, data;
            if (like) {
                const newLikeCounter = like.likeCounter === 0 ? 1 : 0;
                const resMongo = await db.collection("likes").updateOne(
                    {idTMDB: idMovie},
                    {$set: {likeCounter: newLikeCounter}}
                );
                data = {
                    action: 'likeCounter updated',
                    idMovie: idMovie,
                    liked: newLikeCounter === 1
                }
                res.status(201).json({status: 201, data: data});
            } else {
                resMongo = await db.collection("likes").insertOne(
                    {idTMDB: idMovie, likeCounter: 1}
                )
                data = {
                    action: 'likeCounter initialized',
                    idMovie: idMovie,
                    liked: true
                }
                res.status(201).json({status: 201, data: data});
            }
            break;
        case "GET":
            const likes = await db.collection("likes").findOne({idTMDB: idMovie});
            if (!likes) {
                res.status(404).json({status: 404, error: "Not Found"});
            } else {
                res.json({
                    status: 200, data: {
                        liked: likes.likeCounter === 1
                    }
                });
            }
            break;
        default:
            res.status(405).json({status: 405, error: "Method Not Allowed"});
    }
}
