export default async function handler(req, res) {
    const { email, password } = req.body
    console.log(email, password);

    res.status(200).json({ success: true, userData: {name: "John"} });
}