-- Drop tables
DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS users;

-- Create tables
CREATE TABLE users (

	user_id SERIAL PRIMARY KEY,

	username TEXT NOT NULL,
	password TEXT NOT NULL,

  role TEXT NOT NULL
);
CREATE TABLE ticket (

	ticket_id SERIAL PRIMARY KEY,

	submitted_by_id INT REFERENCES users(user_id) NOT NULL,
	processed_by_id INT REFERENCES users(user_id) NOT NULL DEFAULT 1,

	status INT NOT NULL DEFAULT 0,

	amount DECIMAL NOT NULL,
	description TEXT NOT NULL
);

-- Insert sample data
INSERT INTO users (username, password, role) VALUES ('system', '', 'system');
INSERT INTO users (username, password, role) VALUES ('manager', '12345678', 'manager');