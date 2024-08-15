const { Schema, model } = require('mongoose');

const PlaceDiscardSchema = new Schema({
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    address: { type: String, required: true },
    googlePlaceId: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const PlaceDiscard = model('PlaceDiscard', PlaceDiscardSchema);
module.exports = PlaceDiscard;