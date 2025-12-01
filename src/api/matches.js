export default async function handler(req, res) {
    try {
        const targetURL = "https://spl.starphones.com.au/matches.csv";

        const response = await fetch(targetURL);

        if (!response.ok) {
            return res.status(response.status).send("Error fetching CSV");
        }

        const csv = await response.text();

        // Allow your frontend to access it
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        res.setHeader("Content-Type", "text/csv");

        return res.status(200).send(csv);
    } catch (err) {
        return res.status(500).json({ error: "Server proxy failed" });
    }
}
