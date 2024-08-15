const { Factory } = require("fishery");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

const placeDiscardFactory = Factory.define(() => {
    return {
        _id: new mongoose.Types.ObjectId(),
        title: faker.lorem.sentence(),
        address: faker.address.streetAddress(),
        rating: faker.random.numeric(),
        googlePlaceId: faker.random.alphaNumeric(),
        createdAt: new Date(),
        updatedAt: new Date()
    }
});

module.exports = placeDiscardFactory;