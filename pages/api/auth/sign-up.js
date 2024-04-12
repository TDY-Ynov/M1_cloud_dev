import clientPromise from "../../../lib/mongodb";
import bcrypt from 'bcrypt';

/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     description: Create new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("ynov-cloud");

    switch (req.method) {
        case "POST":
            try {
                const existingUser = await db.collection("users").findOne({ email: req.body.email });
                if (existingUser) {
                    return res.status(400).json({ status: 400, error: "Email already exists" });
                }

                req.body.password = await bcrypt.hash(req.body.password, 10);

                const newUser = await db.collection("users").insertOne(req.body);
                res.status(201).json({ status: 201, data: { ...newUser.insertedId, ...req.body } });
            } catch (error) {
                console.error("Error creating user:", error);
                res.status(500).json({ status: 500, error: "Internal Server Error" });
            }
            break;
        default:
            res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
