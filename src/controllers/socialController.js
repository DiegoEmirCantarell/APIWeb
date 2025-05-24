const { TwitterApi } = require('twitter-api-v2');

const postToTwitter = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Tweet text is required and must be a non-empty string'
            });
        }

        // Create client with OAuth 1.0a user context
        const client = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY,
            appSecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessSecret: process.env.TWITTER_ACCESS_SECRET,
        });

        // Post the tweet
        const tweet = await client.v2.tweet(text.trim().substring(0, 280));

        return res.status(201).json({
            status: 'success',
            data: tweet
        });

    } catch (error) {
        console.error('Twitter API Error:', {
            message: error.message,
            response: error.response?.body,
            stack: error.stack
        });

        return res.status(error.response?.statusCode || 500).json({
            status: 'error',
            message: 'Failed to post tweet',
            detail: error.message
        });
    }
};

module.exports = {
    postToTwitter
};