const express = require('express');
const {
  getAllFlights,
  addFlight,
  getFlightsByDeparture,
  getFlightsByArrival,
  getFlightsByTerminal,
  getFlightByNumber,
  updateSeats,
  deleteFlight
} = require('../controllers/flightsController');
const router = express.Router();

// List all flights
router.get('/', getAllFlights);

// Add a new flight
router.post('/', addFlight);

// Get flights by departure location
router.get('/departure/:location', getFlightsByDeparture);

// Get flights by arrival location
router.get('/arrival/:location', getFlightsByArrival);

// Get flights by terminal
router.get('/terminal/:terminal', getFlightsByTerminal);

// Get a flight by flight number
router.get('/:flight_number', getFlightByNumber);

// Update seats left for a flight
router.patch('/:flight_number/seats', updateSeats);

// Delete a flight
router.delete('/:flight_number', deleteFlight);

module.exports = router;
