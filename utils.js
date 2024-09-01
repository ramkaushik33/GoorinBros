/**
 * Makes an API request with specified options.
 * 
 * @param {string} url - The URL of the API endpoint.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {Object} headers - An object representing the headers for the request.
 * @param {Object} body - The body of the request (used with POST, PUT, etc.), will be stringified.
 * @returns {Promise} - A promise that resolves with the response data or rejects with an error.
 */
async function apiRequest(url, method = 'GET', headers = {}, body = null) {
    try {
        // Configure request options
        const options = {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: body ? JSON.stringify(body) : null
        };

        // Remove body if method is GET
        if (method.toUpperCase() === 'GET') {
            delete options.body;
        }

        // Make the API request
        const response = await fetch(url, options);

        // Check if response is OK (status in range 200-299)
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        // Parse and return JSON response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

// Example usage
(async () => {
    try {
        const response = await apiRequest('https://api.example.com/data', 'GET', {
            'Authorization': 'Bearer your-token'
        });
        console.log('Response Data:', response);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();

