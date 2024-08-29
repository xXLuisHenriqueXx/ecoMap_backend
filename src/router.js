const express = require('express');

const authController = require('./controllers/auth-controller');
const userController = require('./controllers/user-controller');
const googlePlacesController = require('./controllers/google-places-controller');
const placeDiscardController = require('./controllers/place-discard-controller')

const withAuth = require('./middlewares/auth');
const upload = require('./middlewares/upload');

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
router.get('/savedplaces', withAuth, placeDiscardController.getPlaces);
router.post('/savedplaces', withAuth, placeDiscardController.save);
router.delete('/savedplaces/:_id', withAuth, placeDiscardController.delete);

// Profile Picture routes
router.post('/profilepicture', withAuth, upload.single('profilePicture'), userController.updateProfilePicture);
router.delete('/profilepicture', withAuth, userController.removeProfilePicture);

module.exports = router;