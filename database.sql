DROP TABLE IF EXISTS courts;
CREATE TABLE IF NOT EXISTS courts (
    court_id SERIAL,
    court_name VARCHAR(255) NOT NULL,
    CONSTRAINT courts_pkey PRIMARY KEY (court_id),
    UNIQUE (court_name)
);

DROP TABLE IF EXISTS members;
CREATE TABLE IF NOT EXISTS members (
    member_id SERIAL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    CONSTRAINT members_pkey PRIMARY KEY (member_id),
    UNIQUE (email)
);

DROP TABLE IF EXISTS bookings;
CREATE TABLE IF NOT EXISTS bookings (
    booking_id SERIAL,
    court_id INT,
    member_id INT,
    booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    booking_date DATE NOT NULL,
    booking_start_at TIME NOT NULL,
    booking_end_at TIME NOT NULL,
    CONSTRAINT bookings_pkey PRIMARY KEY (booking_id), 
    CONSTRAINT fk_court FOREIGN KEY(court_id) REFERENCES courts(court_id) ON DELETE CASCADE,
    CONSTRAINT fk_member FOREIGN KEY(member_id) REFERENCES members(member_id) ON DELETE CASCADE
);

INSERT INTO courts (court_name)
VALUES ('Court1');

INSERT INTO courts (court_name)
VALUES ('Court2');

INSERT INTO courts (court_name)
VALUES ('Court 3');

INSERT INTO courts (court_name)
VALUES ('Court 4');

INSERT INTO members (first_name, last_name,email)
VALUES ('John', 'Doe','johndoe@gmail.com');

INSERT INTO members (first_name, last_name,email)
VALUES ('Jane', 'Boe','janeboe@gmail.com');

INSERT INTO bookings (court_id, member_id,booking_date,booking_start_at,booking_end_at)
VALUES (1, 1,'2023-12-31','12:00','13:00');