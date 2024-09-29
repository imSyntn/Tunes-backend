const axios = require('axios')
const apiCache = require('apicache')
const proxyRoute = require("express")();

const cache = apiCache.middleware;


proxyRoute.route('/trending-now').get(cache('2 days'), async (req, res) => {
    try {
        const response = await axios.get('https://www.jiosaavn.com/api.php?__call=content.getTrending&api_version=4&_format=json&_marker=0&ctx=web6dot0');
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching trending data:', error);
        res.status(500).json({ message: 'Error fetching trending data' });
    }
});

proxyRoute.route('/top-artists').get(cache('2 days'), async (req, res) => {
    try {
        const response = await axios.get('https://www.jiosaavn.com/api.php?__call=social.getTopArtists&api_version=4&_format=json&_marker=0&ctx=web6dot0');
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching top artists data:', error);
        res.status(500).json({ message: 'Error fetching top artists data' });
    }
});

proxyRoute.route('/new-releases').get(cache('2 days'), async (req, res) => {
    try {
        const response = await axios.get('https://www.jiosaavn.com/api.php?__call=content.getAlbums&api_version=4&_format=json&_marker=0&n=50&p=1&ctx=web6dot0');
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching new releases:', error);
        res.status(500).json({ message: 'Error fetching new releases' });
    }
});

module.exports = { proxyRoute }