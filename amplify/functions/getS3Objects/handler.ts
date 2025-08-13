import type { Schema } from "../../data/resource"
export const handler: Schema["getS3Objects"]["functionHandler"] = async (event) => {

    try {
        const apiURL = process.env.API_URL ?? "";
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_TOKEN',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // parse JSON response
        console.log(data);
        return data;

    } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
    }
}