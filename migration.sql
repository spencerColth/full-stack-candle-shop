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
VALUES ('Aimee Kali', 8675309, 'aimali@gmail.com', 135, 1,'Yes');


INSERT INTO doctors (name, specialty, phone, email, available) 
VALUES ('Obi Charis', 'Neurosurgeon', 8675308, 'obiris@gmail.com', 'Yes');


INSERT INTO insurance (name) 
VALUES ('AllAngles Insurance');
