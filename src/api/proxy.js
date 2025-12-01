export default async function handler(req, res) {
    const path = req.url.replace("/api/", "");
    const url = `https://spl.starphones.com.au/${path}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Proxy failed" });
    }
}
