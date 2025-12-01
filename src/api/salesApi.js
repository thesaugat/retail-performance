// API fetching and CSV parsing logic

/**
 * Parse CSV text into structured data
 */
export const parseCSVData = (csvText) => {
    try {
        const lines = csvText.trim().split('\n');
        if (lines.length < 2) throw new Error('CSV file is empty or invalid');

        const parseCSVLine = (line) => {
            const values = [];
            let current = '';
            let inQuotes = false;

            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    values.push(current.trim());
                    current = '';
                } else {
                    current += char;
                }
            }
            values.push(current.trim());
            return values;
        };

        const data = [];
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue;
            const values = parseCSVLine(lines[i]);
            if (values.length < 14) continue;

            data.push({
                Date: values[0],
                Group: values[1],
                No: values[2],
                Matches: values[3],
                Team1: values[4],
                Team2: values[5],
                Team1Sales: parseFloat(values[6]) || 0,
                Team2Sales: parseFloat(values[7]) || 0,
                Winner: values[8],
                Loser: values[9],
                Winner_1: parseFloat(values[10]) || 0,
                Loser_2: parseFloat(values[11]) || 0,
                TotalWinner: parseFloat(values[12]) || 0,
                TotalLoser: parseFloat(values[13]) || 0
            });
        }

        if (data.length === 0) throw new Error('No valid data found in CSV');
        console.log(`Successfully parsed ${data.length} matches`);
        return data;
    } catch (err) {
        console.error('CSV parsing error:', err);
        throw new Error(`Failed to parse CSV: ${err.message}`);
    }
};

/**
 * Fetch sales data from API
 */
export const fetchSalesData = async () => {
    try {
        const baseURL =
            import.meta.env.MODE === "development"
                ? "/api"
                : "https://spl.starphones.com.au";

        const response = await fetch(`${baseURL}/matches.csv`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const csvText = await response.text();

        if (!csvText || csvText.trim().length === 0) {
            throw new Error('Received empty response from server');
        }

        const parsedData = parseCSVData(csvText);
        return parsedData;
    } catch (err) {
        console.error('Fetch error:', err);

        let errorMessage = err.message;
        if (err.message.includes('Failed to fetch')) {
            errorMessage = 'Network error: Make sure the dev server is running.';
        }

        throw new Error(errorMessage);
    }
};