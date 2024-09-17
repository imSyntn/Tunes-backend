const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Import axios for HTTP requests

const app = express();

app.use(cors({
    origin: 'https://stream-tunes.vercel.app', // Allow all origins, but restrict this in production for security
}));

// Trending Now Route
app.get('/trending-now', async (req, res) => {
    try {
        const response = await axios.get('https://www.jiosaavn.com/api.php?__call=content.getTrending&api_version=4&_format=json&_marker=0&ctx=web6dot0');
        res.status(200).json(response.data); // Send the data from JioSaavn API
    } catch (error) {
        console.error('Error fetching trending data:', error);
        res.status(500).json({ message: 'Error fetching trending data' });
    }
});

// Top Artists Route
app.get('/top-artists', async (req, res) => {
    try {
        const response = await axios.get('https://www.jiosaavn.com/api.php?__call=social.getTopArtists&api_version=4&_format=json&_marker=0&ctx=web6dot0');
        res.status(200).json(response.data); // Send the data from JioSaavn API
    } catch (error) {
        console.error('Error fetching top artists data:', error);
        res.status(500).json({ message: 'Error fetching top artists data' });
    }
});

// New Releases Route
app.get('/new-releases', async (req, res) => {
    try {
        const response = await axios.get('https://www.jiosaavn.com/api.php?__call=content.getAlbums&api_version=4&_format=json&_marker=0&n=50&p=1&ctx=web6dot0');
        res.status(200).json(response.data); // Send the data from JioSaavn API
    } catch (error) {
        console.error('Error fetching new releases:', error);
        res.status(500).json({ message: 'Error fetching new releases' });
    }
});

// Start the server
app.listen(8000, () => {
    console.log('Server started on port 8000');
});
