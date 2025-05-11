-- SQL schema for flights table
CREATE TABLE IF NOT EXISTS flights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    flight_number TEXT NOT NULL,
    arrival_location TEXT NOT NULL,
    arrival_time TEXT NOT NULL,
    departure_location TEXT NOT NULL,
    departure_time TEXT NOT NULL,
    terminal TEXT NOT NULL,
    seats_left INTEGER NOT NULL
);

-- Example data
INSERT INTO flights (flight_number, arrival_location, arrival_time, departure_location, departure_time, terminal, seats_left) VALUES
('AI101', 'Delhi', '2025-05-12 09:00', 'Mumbai', '2025-05-12 07:00', 'T1', 42),
('BA202', 'London', '2025-05-12 13:30', 'Delhi', '2025-05-12 02:00', 'T3', 15),
('UA303', 'San Francisco', '2025-05-12 20:45', 'Delhi', '2025-05-12 10:30', 'T2', 5);
