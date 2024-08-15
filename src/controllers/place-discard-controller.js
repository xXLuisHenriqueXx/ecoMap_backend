const PlaceDiscard = require('../models/PlaceDiscard');

const PlaceDiscardController = {
    getPlaces: async (req, res) => {
        const userId = req.user._id;

        try {
            const places = await PlaceDiscard.find({ user: userId });

            return res.status(200).json(places);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    save: async (req, res) => {
        const userId = req.user._id;
        const { title, rating, address, googlePlaceId } = req.body;

        try {
            const place = new PlaceDiscard({
                title,
                address,
                rating,
                googlePlaceId,
                userId
            });
            await place.save();

            return res.status(201).json(place);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        const { _id } = req.params;

        try {
            const place = await PlaceDiscard.findById(_id);

            if (!place) {
                return res.status(404).json({ error: 'Place not found' });
            }

            await place.deleteOne({ _id: note._id });

            return res.status(204).json();
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
};

module.exports = PlaceDiscardController;