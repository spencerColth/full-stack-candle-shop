import express from "express";
import { readFile } from "fs";
import postgres from "postgres";
import bodyParser from "body-parser";
const port = 3000;

const sql = postgres(
"postgres://patientdb:pTU6gYAMsPXlG6dYQ1Yg8p7tkmVuEA2P@dpg-cegce4kgqg4bl46mg2jg-a.oregon-postgres.render.com/patientdb"
);

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
  const { id } = req.params;
  sql`DELETE FROM patients WHERE id= ${id}`.then((result) => {
    res.json(result);
  });
});

//===========================Doctor Routes ===============================

app.get("/api/doctors/:id", (req, res) => {
  const { search } = req.params;
  const { id } = req.params;
  sql`SELECT * FROM doctors WHERE id= ${id}`.then((result) => {
    res.json(result);
  });
});

app.get("/api/doctors", (req, res) => {
  const { search } = req.params;
  sql`SELECT * FROM doctors`.then((result) => {
    res.json(result);
  });
});

app.post("/api/doctors", (req, res) => {
  const { name, phone, email, specialty, available } = req.body;
  sql`INSERT INTO doctors (name, specialty, phone, email, available) VALUES (${name}, ${specialty}, ${phone}, ${email}, ${available}) RETURNING *`.then(
    (result) => {
      res.send(result[0]);
    }
  );
});

app.delete("/api/doctors/:id", (req, res) => {
  const { id } = req.params;
  sql`DELETE FROM doctors WHERE id= ${id}`.then((result) => {
    res.json(result);
  });
});
//===========================INSURANCE ROUTES ==========================
app.get("/api/insurance", (req, res) => {
  sql`SELECT * FROM insurance`.then((result) => {
    res.json(result);
  });
});

app.get("/api/insurance/:id", (req, res) => {
  const { id } = req.params;
  sql`SELECT * FROM insurance WHERE id= ${id}`.then((result) => {
    res.json(result);
  });
});

app.post("/api/insurance", (req, res) => {
  const { name } = req.body;
  sql`INSERT INTO insurance (name) VALUES (${name}) RETURNING *`.then(
    (result) => {
      res.send(result[0]);
    }
  );
});

app.patch("/api/insurance/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  sql`
    UPDATE insurance SET name=COALESCE(${
      name || null
    }, name) WHERE id=${id} RETURNING *
    `.then((result) => {
    res.json(result[0]);
  });
});

app.delete("/api/insurance/:id", (req, res) => {
  const { id } = req.params;
  sql`DELETE FROM insurance WHERE id= ${id}`.then((result) => {
    res.json(result);
  });
});

//====================================================================
app.listen(port, () => {
  console.log(`Port ${port} is hot and ready for your requests.`);
});
