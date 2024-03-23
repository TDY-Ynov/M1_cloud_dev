import clientPromise from "/lib/mongodb";
import {ObjectId} from "mongodb";

/**
 * @swagger
 * /api/users/{idUser}:
 *   get:
 *     description: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Success Response
 *       404:
 *         description: User Not Found
 *       405:
 *         description: Method Not Allowed
 *       500:
 *         description: Internal Server Error
 *   put:
 *     description: Update an existing user by ID
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User Not Found
 *       405:
 *         description: Method Not Allowed
 *       500:
 *         description: Internal Server Error
 *   delete:
 *     description: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User Not Found
 *       405:
 *         description: Method Not Allowed
 *       500:
 *         description: Internal Server Error
 */

export default async function handler(req, res) {
    const idUser = req.query.idUser;
    const client = await clientPromise;
    const db = client.db("ynov-cloud");

    switch (req.method) {
        case "GET":
            try {
                const user = await db.collection("users").findOne({_id: ObjectId(idUser)});
                if (!user) {
                    res.status(404).json({status: 404, error: "User Not Found"});
                } else {
                    res.status(200).json({status: 200, data: user});
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                res.status(500).json({status: 500, error: "Internal Server Error"});
            }
            break;
        case "PUT":
            try {
                const updatedUser = await db.collection("users").findOneAndUpdate(
                    {_id: ObjectId(idUser)},
                    {$set: req.body},
                );
                if (!updatedUser.value) {
                    res.status(404).json({status: 404, error: "User Not Found"});
                } else {
                    res.status(200).json({status: 200, data: updatedUser.value});
                }
            } catch (error) {
                console.error("Error updating user:", error);
                res.status(500).json({status: 500, error: "Internal Server Error"});
            }
            break;
        case "DELETE":
            try {
                const deletedUser = await db.collection("users").deleteOne({_id: ObjectId(idUser)});
                if (deletedUser.deletedCount === 0) {
                    res.status(404).json({status: 404, error: "User Not Found"});
                } else {
                    res.status(200).json({status: 200, message: "User deleted successfully"});
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                res.status(500).json({status: 500, error: "Internal Server Error"});
            }
            break;
        default:
            res.status(405).json({status: 405, error: "Method Not Allowed"});
    }
}
