const { Factory } = require("fishery");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

const placeDiscardFactory = Factory.define(() => {
    return {
        _id: new mongoose.Types.ObjectId(),
        title: faker.lorem.sentence(),
        address: faker.address.streetAddress(),
        rating: Math.floor(Math.random() * 5) + 1,
        googlePlaceId: faker.random.alphaNumeric(),
        createdAt: new Date(),
        updatedAt: new Date()
    }
});

module.exports = placeDiscardFactory;