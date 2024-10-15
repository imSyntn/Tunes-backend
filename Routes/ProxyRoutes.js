const proxyRoute = require("express")();
const { CustomFetch } = require('../Utils/Fetch')

proxyRoute.route('/trending-now').get(async (req, res) => {
    const { response, stat } = await CustomFetch('https://www.jiosaavn.com/api.php?__call=content.getTrending&api_version=4&_format=json&_marker=0&ctx=web6dot0', 'trending-now')

    res.status(stat).json(response)
});

proxyRoute.route('/top-artists').get(async (req, res) => {
    const { response, stat } = await CustomFetch('https://www.jiosaavn.com/api.php?__call=social.getTopArtists&api_version=4&_format=json&_marker=0&ctx=web6dot0', "top-artists")

    res.status(stat).json(response)
});

proxyRoute.route('/new-releases').get(async (req, res) => {
    const { response, stat } = await CustomFetch('https://www.jiosaavn.com/api.php?__call=content.getAlbums&api_version=4&_format=json&_marker=0&n=50&p=1&ctx=web6dot0', "new-releases")

    res.status(stat).json(response)
});

module.exports = { proxyRoute }