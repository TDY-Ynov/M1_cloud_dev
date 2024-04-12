import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";

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

            res.status(200).json({ success: true, userData: { name: user.name } });
        } catch (error) {
            console.error("Error authenticating user:", error);
            res.status(500).json({ status: 500, error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ status: 405, error: "Method Not Allowed" });
    }
}
