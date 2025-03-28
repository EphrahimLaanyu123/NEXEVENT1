const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth'); // Authentication middleware

// Create a new event (protected route)
router.post('/', auth, eventController.createEvent);

// Get all events
router.get('/', eventController.getEvents);

module.exports = router;