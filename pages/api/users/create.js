import clientPromise from "../../../lib/mongodb";

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     description: Create a new user
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
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *       405:
 *         description: Method Not Allowed
 */

export default async function handler(req, res) {
    const idUser = req.query.idUser;
    const client = await clientPromise;
    const db = client.db("ynov-cloud");

    switch (req.method) {
        case "POST":
            try {
                const newUser = await db.collection("users").insertOne(req.body);
                res.status(201).json({status: 201, data: {...newUser.insertedId, ...req.body}});
            } catch (error) {
                console.error("Error creating user:", error);
                res.status(500).json({status: 500, error: "Internal Server Error"});
            }
            break;
        default:
            res.status(405).json({status: 405, error: "Method Not Allowed"});
    }
}
