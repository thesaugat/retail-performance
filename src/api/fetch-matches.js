export default async function handler(req, res) {
    try {
        // Fetch the CSV from the external server
        const response = await fetch('https://spl.starphones.com.au/matches.csv');

        if (!response.ok) {
            throw new Error(`External server error: ${response.status} ${response.statusText}`);
        }

        const csvText = await response.text();

        // Set CORS headers - THIS IS CRITICAL
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // Set content type
        res.setHeader('Content-Type', 'text/csv');

        // Optional: Add caching
        res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600');

        // Send the CSV data
        res.status(200).send(csvText);

    } catch (error) {
        console.error('Proxy error:', error);

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({
            error: 'Failed to fetch CSV data',
            message: error.message
        });
    }
}

// Handle OPTIONS request for CORS preflight
export function options(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
}