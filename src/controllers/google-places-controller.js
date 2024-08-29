require('dotenv').config();
const axios = require('axios');

module.exports = {
    nearbyPlaces: async (req, res) => {
        const { latitude, longitude, radius = 5000 } = req.query;

        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
                params: {
                    location: `${latitude},${longitude}`,
                    radius,
                    type: 'recycling_center',
                    keywords: 'recycling',
                    key: process.env.GOOGLE_API_KEY
                }
            });

            return res.json(response.data.results);
        } catch (error) {
            return res.status(500).json({ error: "Falha ao buscar lugares próximos" });
        }
    },

    getPlaceDetails: async (req, res) => {
        const { placeId } = req.params;

        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
                params: {
                    place_id: placeId,
                    key: process.env.GOOGLE_API_KEY
                }
            });

            return res.json(response.data.result);
        } catch (error) {
            return res.status(500).json({ error: "Falha ao buscar detalhes do lugar" });
        }
    }
};