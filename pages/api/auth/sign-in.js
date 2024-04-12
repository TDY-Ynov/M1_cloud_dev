import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     description: User authentication
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
 *       200:
 *         description: Authentication successful
 *       401:
 *         description: Authentication failed due to incorrect email or password
 *       500:
 *         description: Internal server error
 */
export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("ynov-cloud");

    if (req.method === "POST") {
        try {
            const user = await db.collection("users").findOne({ email: req.body.email });

            if (!user) {
                return res.status(401).json({ status: 401, error: "Invalid email or password" });
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ status: 401, error: "Invalid email or password" });
            }

            res.status(200).json({ success: true, userData: { email: user.email } });
        } catch (error) {
            console.error("Error authenticating user:", error);
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
