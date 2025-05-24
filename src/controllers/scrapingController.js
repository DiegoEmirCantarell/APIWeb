const axios = require('axios');
const cheerio = require('cheerio');

const compareProducts = async (req, res) => {
    try {
        const { product } = req.query;
        
        if (!product) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Product parameter is required' 
            });
        }

        const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(product)}`;
        
        const response = await axios.get(searchUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/108.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1'
            }
        });

        const $ = cheerio.load(response.data);
        const products = [];

        // Log the HTML for debugging
        console.log('HTML Response:', response.data);

        // Try multiple selectors for products
        const productElements = $('.s-result-item[data-component-type="s-search-result"]');
        console.log('Found products:', productElements.length);

        productElements.each((i, element) => {
            if (i < 5) {
                const title = $(element).find('.a-size-base-plus, .a-size-medium, .a-text-normal')
                    .filter(function() {
                        const text = $(this).text().trim();
                        return text && !text.includes("Featured") && !text.includes("Amazon's Choice") && !text.includes("Sponsored");
                    })
                    .first()
                    .text()
                    .trim();

                // Updated price selector
                const priceText = $(element).find('span.a-color-base')
                    .filter(function() {
                        const text = $(this).text().trim();
                        return text.includes('US$') || text.includes('$');
                    })
                    .first()
                    .text()
                    .trim();

                const price = priceText ? priceText.replace('US$', '$') : 'Price not available';

                // Get rating
                const rating = $(element).find('i.a-icon-star-small span, i.a-icon-star span')
                    .first()
                    .text()
                    .trim();

                // Get image
                const image = $(element).find('img.s-image').attr('src');

                // Get link
                const link = $(element).find('a.a-link-normal[href*="/dp/"]')
                    .first()
                    .attr('href');

                // Only add products with valid titles
                if (title && !title.includes("Sponsored")) {
                    products.push({
                        title,
                        price,
                        rating: rating || 'No rating',
                        image: image || '',
                        link: link ? `https://www.amazon.com${link}` : ''
                    });

                    // Log successful product extraction
                    console.log('Valid product found:', {
                        title: title.substring(0, 50) + '...',
                        price,
                        rating
                    });
                }
            }
        });

        if (products.length === 0) {
            console.log('No products found. Response status:', response.status);
            console.log('Response headers:', response.headers);
        }

        res.status(200).json({
            status: 'success',
            data: products
        });
    } catch (error) {
        console.error('Scraping error details:', {
            message: error.message,
            status: error.response?.status,
            headers: error.response?.headers,
            data: error.response?.data
        });
        
        res.status(500).json({
            status: 'error',
            message: 'Error fetching product data',
            detail: error.message
        });
    }
};

module.exports = {
    compareProducts
};