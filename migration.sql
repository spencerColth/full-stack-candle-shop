DROP TABLE IF EXISTS doctors;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS insurance;
CREATE TABLE patients (
    id SERIAL,
    name TEXT,
    phone BIGINT,
    email TEXT,
    insurance_id INTEGER,
    doctor_id INTEGER,
    insurance_active TEXT
);

CREATE TABLE doctors (
    id SERIAL,
    name TEXT,
    specialty TEXT,
    phone INTEGER,
    email text,
    available TEXT
);

CREATE TABLE insurance (
    id SERIAL,
    name TEXT
);


INSERT INTO patients (name, phone, email, insurance_id, doctor_id, insurance_active) 
VALUES ('Aimee Kali', 8675309, 'aimali@gmail.com', 49148, 1,'Yes');
VALUES ('Joe Henderson', 8675308, 'henjo@gmail.com', 49147, 1,'Yes');
VALUES ('Rachele Sakshi', 8675306, 'rachakshi@gmail.com', 49147, 1,'Yes');



