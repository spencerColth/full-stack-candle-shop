
DROP TABLE IF EXISTS patients;
CREATE TABLE patients (
    id SERIAL,
    name TEXT,
    phone BIGINT,
    email TEXT,
    insurance_id INTEGER,
    doctor_id INTEGER,
    insurance_active TEXT
);


INSERT INTO patients (name, phone, email, insurance_id, doctor_id, insurance_active) 
VALUES ('Aimee Kali', 8675309, 'aimali@gmail.com', 49148, 1,'Yes');
INSERT INTO patients (name, phone, email, insurance_id, doctor_id, insurance_active)
VALUES ('Joe Henderson', 8675308, 'henjo@gmail.com', 49147, 1,'Yes');
INSERT INTO patients (name, phone, email, insurance_id, doctor_id, insurance_active)
VALUES ('Rachele Sakshi', 8675306, 'rachakshi@gmail.com', 49147, 1,'Yes');

