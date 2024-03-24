import clientPromise from "../../../lib/mongodb";

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success Response
 *       405:
 *         description: Method Not Allowed
 *       500:
 *         description: Internal Server Error
 */
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("ynov-cloud");

    switch (req.method) {
        case "GET":
            try {
                const users = await db.collection("users").find().toArray();
                res.status(200).json({ status: 200, data: users });
            } catch (error) {
                console.error("Error fetching users:", error);
                res.status(500).json({ status: 500, error: "Internal Server Error" });
            }
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
