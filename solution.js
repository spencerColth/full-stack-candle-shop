import express from "express";
import { readFile } from "fs";
import postgres from "postgres";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

dotenv.config();

const port = 3000;

const sql = postgres(process.env.DATABASE_URL);

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("./client"));

//============================ PATIENT ROUTES ===========================
app.get("/api/patients", (req, res) => {
  const { search } = req.params;
  sql`SELECT * FROM patients`.then((result) => {
    res.json(result);
  });
});

app.get("/api/patients/:id", (req, res) => {
  const { search } = req.params;
  const { id } = req.params;
  sql`SELECT * FROM patients WHERE id= ${id}`.then((result) => {
    res.json(result);
  });
});

app.post("/api/patients", (req, res) => {
  const { name, phone, email, insurance_id, doctor_id, insurance_active } =
    req.body;
  sql`INSERT INTO patients (name, phone, email, insurance_id, doctor_id, insurance_active) VALUES (${name}, ${phone}, ${email}, ${insurance_id}, ${doctor_id}, ${insurance_active}) RETURNING *`.then(
    (result) => {
      res.send(result[0]);
    }
  );
});

app.patch("/api/patients/:id", (req, res) => {
  const { name, phone, email, insurance_id, doctor_id, insurance_active } =
    req.body;
  const { id } = req.params;

  sql`
    UPDATE patients 
    SET 
    name=COALESCE(${name || null}, name), 
    phone=COALESCE(${phone || null}, phone), 
    email=COALESCE(${email || null}, email),
    insurance_id=COALESCE(${insurance_id || null}, insurance_id),
    doctor_id=COALESCE(${doctor_id || null}, doctor_id),
    insurance_active=COALESCE(${insurance_active || null}, insurance_active)
    WHERE id=${id} RETURNING *
    `.then((result) => {
    res.json(result[0]);
  });
});

app.delete("/api/patients/:id", (req, res) => {
  const id = req.params.id;
  sql`DELETE FROM patients WHERE id= ${id} RETURNING *`.then((result) => {
    res.json(result);
  });
});
//====================================================================
app.listen(port, () => {
  console.log(`Port ${port} is hot and ready for your requests.`);
});
