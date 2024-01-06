DROP TABLE IF EXISTS courts;
CREATE TABLE IF NOT EXISTS courts (
    court_id SERIAL,
    court_name VARCHAR(20) NOT NULL,
    CONSTRAINT courts_pkey PRIMARY KEY (court_id),
    ON DELETE CASCADE,
    UNIQUE (court_name)
);
INSERT INTO courts (court_name)
VALUES ('Court1'),
    ('Court2'),
    ('Court 3'),
    ('Court 4');
SELECT *
FROM courts c;
DROP TABLE IF EXISTS members;
CREATE TABLE IF NOT EXISTS members (
    member_id SERIAL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    CONSTRAINT members_pkey PRIMARY KEY (member_id),
    ON DELETE CASCADE,
    UNIQUE (email)
);
INSERT INTO members (first_name, last_name, email)
VALUES ('John', 'Doe', 'johndoe@gmail.com'),
    ('Jane', 'Boe', 'janeboe@gmail.com');
SELECT *
FROM members m;
DROP TABLE IF EXISTS days_of_week;
CREATE TABLE IF NOT EXISTS days_of_week (
    day_id SERIAL PRIMARY KEY,
    day_name varchar(20) UNIQUE NOT NULL
);
INSERT INTO days_of_week (day_name)
VALUES ('Monday'),
    ('Tuesday'),
    ('Wednesday'),
    ('Thursday'),
    ('Friday'),
    ('Saturday'),
    ('Sunday');
SELECT *
FROM days_of_week dow;
DROP TABLE IF EXISTS start_times;
CREATE TABLE IF NOT EXISTS start_times (
    start_time_id SERIAL,
    start_time TIME UNIQUE NOT NULL
);
INSERT INTO start_times (start_time)
VALUES ('20:00');
SELECT *
FROM start_times st;
DROP TABLE IF EXISTS durations;
CREATE TABLE durations (
    duration_id SERIAL PRIMARY KEY,
    duration_hours INTEGER UNIQUE NOT NULL
);
INSERT INTO durations (duration_hours)
VALUES (1),
    (2),
    (3);
SELECT *
FROM durations bd;
CREATE TABLE booking_types (
    booking_type_id SERIAL PRIMARY KEY,
    booking_type_name VARCHAR(50) UNIQUE NOT NULL
);
INSERT INTO booking_types (booking_type_name)
VALUES ('singles'),
    ('doubles'),
    ('coaching'),
    ('practice');
SELECT *
FROM booking_types bt;
DROP TABLE IF EXISTS bookings;
CREATE TABLE IF NOT EXISTS bookings (
    booking_id SERIAL UNIQUE,
    court_name VARCHAR(20) NOT NULL,
    member_id INT NOT NULL,
    booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    day_name varchar(20) NOT NULL,
    start_time TIME NOT NULL,
    duration_hours INT NOT NULL,
    booking_type_name VARCHAR(50) NOT NULL,
    CONSTRAINT bookings_pkey PRIMARY KEY (booking_id),
    CONSTRAINT fk_court FOREIGN KEY(court_name) REFERENCES courts(court_name) ON DELETE CASCADE,
    CONSTRAINT fk_member FOREIGN KEY(member_id) REFERENCES members(member_id) ON DELETE CASCADE,
    CONSTRAINT fk_day FOREIGN KEY(day_name) REFERENCES days_of_week(day_name) ON DELETE CASCADE,
    CONSTRAINT fk_duration FOREIGN KEY(duration_hours) REFERENCES durations(duration_hours) ON DELETE CASCADE,
    CONSTRAINT fk_booking_type FOREIGN KEY(booking_type_name) REFERENCES booking_types(booking_type_name) ON DELETE CASCADE --    CONSTRAINT no_duplicate_booking UNIQUE (court_id, day_name, start_time)
);
INSERT INTO bookings (
        court_name,
        member_id,
        day_name,
        start_time,
        duration_hours,
        booking_type_name
    )
VALUES ('Court 1', 1, 'Monday', '13:00', '3', 'singles');
SELECT *
FROM bookings b;