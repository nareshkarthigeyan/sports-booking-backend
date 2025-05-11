// flightsController.js
// Controller for handling flight-related operations using SQLite

exports.getAllFlights = (req, res) => {
  const db = req.db;
  db.all('SELECT flight_number, arrival_location, arrival_time, departure_location, departure_time, terminal, seats_left FROM flights', [], (err, rows) => {
    if (err) {
      console.error('Error fetching flights:', err.message);
      return res.status(500).json({ error: 'Failed to fetch flights' });
    }
    res.json(rows);
  });
};

exports.addFlight = (req, res) => {
  const db = req.db;
  const { flight_number, arrival_location, arrival_time, departure_location, departure_time, terminal, seats_left } = req.body;
  if (!flight_number || !arrival_location || !arrival_time || !departure_location || !departure_time || !terminal || seats_left == null) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  db.run(
    'INSERT INTO flights (flight_number, arrival_location, arrival_time, departure_location, departure_time, terminal, seats_left) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [flight_number, arrival_location, arrival_time, departure_location, departure_time, terminal, seats_left],
    function(err) {
      if (err) {
        console.error('Error adding flight:', err.message);
        return res.status(500).json({ error: 'Failed to add flight' });
      }
      res.status(201).json({ message: 'Flight added successfully', id: this.lastID });
    }
  );
};

exports.getFlightsByDeparture = (req, res) => {
  const db = req.db;
  const { location } = req.params;
  db.all('SELECT * FROM flights WHERE departure_location = ?', [location], (err, rows) => {
    if (err) {
      console.error('Error fetching flights by departure:', err.message);
      return res.status(500).json({ error: 'Failed to fetch flights' });
    }
    res.json(rows);
  });
};

exports.getFlightsByArrival = (req, res) => {
  const db = req.db;
  const { location } = req.params;
  db.all('SELECT * FROM flights WHERE arrival_location = ?', [location], (err, rows) => {
    if (err) {
      console.error('Error fetching flights by arrival:', err.message);
      return res.status(500).json({ error: 'Failed to fetch flights' });
    }
    res.json(rows);
  });
};

exports.getFlightsByTerminal = (req, res) => {
  const db = req.db;
  const { terminal } = req.params;
  db.all('SELECT * FROM flights WHERE terminal = ?', [terminal], (err, rows) => {
    if (err) {
      console.error('Error fetching flights by terminal:', err.message);
      return res.status(500).json({ error: 'Failed to fetch flights' });
    }
    res.json(rows);
  });
};

exports.getFlightByNumber = (req, res) => {
  const db = req.db;
  const { flight_number } = req.params;
  db.get('SELECT * FROM flights WHERE flight_number = ?', [flight_number], (err, row) => {
    if (err) {
      console.error('Error fetching flight:', err.message);
      return res.status(500).json({ error: 'Failed to fetch flight' });
    }
    if (!row) return res.status(404).json({ error: 'Flight not found' });
    res.json(row);
  });
};

exports.updateSeats = (req, res) => {
  const db = req.db;
  const { flight_number } = req.params;
  const { seats_left } = req.body;
  if (seats_left == null) return res.status(400).json({ error: 'seats_left required' });
  db.run('UPDATE flights SET seats_left = ? WHERE flight_number = ?', [seats_left, flight_number], function(err) {
    if (err) {
      console.error('Error updating seats:', err.message);
      return res.status(500).json({ error: 'Failed to update seats' });
    }
    if (this.changes === 0) return res.status(404).json({ error: 'Flight not found' });
    res.json({ message: 'Seats updated successfully' });
  });
};

exports.deleteFlight = (req, res) => {
  const db = req.db;
  const { flight_number } = req.params;
  db.run('DELETE FROM flights WHERE flight_number = ?', [flight_number], function(err) {
    if (err) {
      console.error('Error deleting flight:', err.message);
      return res.status(500).json({ error: 'Failed to delete flight' });
    }
    if (this.changes === 0) return res.status(404).json({ error: 'Flight not found' });
    res.json({ message: 'Flight deleted successfully' });
  });
};
