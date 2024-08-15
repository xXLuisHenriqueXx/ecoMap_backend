require('dotenv').config();
const database = require('../../src/config/database');
const supertest = require('supertest');
const app = require('../../src/app');
const userFactory = require('../../src/models/factories/user-factory');
const placeDiscardFactory = require('../../src/models/factories/place-discard-factory');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_KEY;

describe('Place Discard Controller', () => {
    let connection;
    let user;
    let token;

    beforeAll(async () => {
        connection = await database.connect();
        connection.once('error', console.error.bind(console, 'MongoDB connection error:'));
    });

    beforeEach(async () => {
        await connection.dropDatabase();
        
        const userInput = userFactory.build();
        user = new connection.models.User(userInput);
        await user.save();

        token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, { expiresIn: '1d' });
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    test('should return a list of places saved by the user', async () => {
        const placeDiscardInput = placeDiscardFactory.build({ user: user._id });
        const placeDiscard = new connection.models.PlaceDiscard(placeDiscardInput);
        await placeDiscard.save();

        const response = await supertest(app)
            .get('/user/places')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);  
    });

    test('should save a new place', async () => {
        const placeDiscardInput = placeDiscardFactory.build({ user: user._id });
        
        const response = await supertest(app)
            .post('/user/places')
            .set('Authorization', `Bearer ${token}`)
            .send(placeDiscardInput);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(placeDiscardInput.title);
        expect(response.body.address).toBe(placeDiscardInput.address);
        expect(response.body.rating).toBe(placeDiscardInput.rating);
        expect(response.body.googlePlaceId).toBe(placeDiscardInput.googlePlaceId);
    });

    test('should delete a place', async () => {
        const placeDiscardInput = placeDiscardFactory.build({ user: user._id });
        const placeDiscard = new connection.models.PlaceDiscard(placeDiscardInput);
        await placeDiscard.save();

        const response = await supertest(app)
            .delete(`/user/places/${placeDiscard._id}`)
            .set('Authorization', `Bearer ${token}`);

        const deletedPlace = await connection.models.PlaceDiscard.findById(placeDiscard._id);

        expect(response.statusCode).toBe(204);
        expect(deletedPlace).toBeNull();
    });
});