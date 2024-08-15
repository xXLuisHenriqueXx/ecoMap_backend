const express = require('express');

const authController = require('./controllers/auth-controller');
const userController = require('./controllers/user-controller');
const googlePlacesController = require('./controllers/google-places-controller');
const placeDiscardController = require('./controllers/place-discard-controller')

const withAuth = require('./middlewares/auth');

const router = express.Router();

// Auth routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// User routes
router.put('/profile', withAuth, userController.update);
router.put('/profile/password', withAuth, userController.updatePassword);
router.get('/user/:_id', withAuth, userController.show);

// Google Places routes
router.get('/places', googlePlacesController.nearbyPlaces);
router.get('/places/:placeId', googlePlacesController.getPlaceDetails);

// User Places routes
router.get('/user/places', withAuth, placeDiscardController.getPlaces);
router.post('/user/places', withAuth, placeDiscardController.save);
router.delete('/user/places/:_id', withAuth, placeDiscardController.delete);

module.exports = router;