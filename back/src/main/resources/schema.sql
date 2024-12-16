-- Drop tables
DROP TABLE IF EXISTS public.ticket;
DROP TABLE IF EXISTS public.user;

-- Create tables
CREATE TABLE public.user (

	user_id SERIAL PRIMARY KEY,

	username TEXT NOT NULL,
	password TEXT NOT NULL
);
CREATE TABLE public.ticket (

	ticket_id SERIAL PRIMARY KEY,

	submitted_by_id INT REFERENCES public.user(user_id) NOT NULL,
	processed_by_id INT REFERENCES public.user(user_id) NOT NULL DEFAULT 1,

	status INT NOT NULL DEFAULT 0,

	amount DECIMAL NOT NULL,
	description TEXT NOT NULL
);

-- Insert sample data
INSERT INTO public.user (username, password) VALUES ('system', '');