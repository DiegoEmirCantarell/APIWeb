const axios = require('axios');

const getTwitterBearerToken = async () => {
    try {
        const credentials = Buffer.from(
            `${process.env.TWITTER_API_KEY}:${process.env.TWITTER_API_SECRET}`
        ).toString('base64');

        const response = await axios.post(
            'https://api.twitter.com/oauth2/token',
            'grant_type=client_credentials',
            {
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        if (response.data && response.data.access_token) {
            return response.data.access_token;
        }

        throw new Error('No bearer token received');
    } catch (error) {
        console.error('Error getting bearer token:', error.response?.data || error.message);
        throw error;
    }
};

module.exports = { getTwitterBearerToken };