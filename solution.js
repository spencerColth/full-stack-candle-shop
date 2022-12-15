
import express  from "express";
import { readFile } from "fs";
import postgres from "postgres";


const port = 3000;

const sql = postgres("postgres://candleshop_user:nl44Q5KFvpbBntQXyQ5Mnhblv8pmde0G@dpg-cedm3mh4reb8944e4peg-a.oregon-postgres.render.com/candleshop?ssl=true")

const app = express();



app.use(express.json());

app.use(express.static("./client"));

//tells any traffic attempting to access client a direct route to the static file path, 
//essentially skips routing TO client and starts the path from there.
//localhost:3000/client/app.js



//===================no clue what it does ==============
// app.get("/app.js", (req,res) => {
//     readFile("client/app.js", "utf-8").then((text) => {
//         res.set("Content-Type", "application/javascript");
//         res.send(text);
//     })
// })
//========================================================
app.get("/api/inventory", (req,res) => {
    sql`SELECT * FROM inventory`.then((result) => {
        res.json(result);
    })
});

app.get("/api/inventory/:id", (req, res) => {
    const {id} = req.params;
    sql`SELECT * FROM inventory WHERE id= ${id}`.then((result) => {
        res.json(result);
    })
})

app.post("/inventory", (req,res) => {
    const {item_name, item_desc, price} = req.body;
    sql`INSERT INTO inventory (item_name, item_desc, price) VALUES (${item_name}, ${item_desc}, ${price}) RETURNING *`.then((result) => {
            res.send(result[0])
    })
});

app.listen(port, () => {
    console.log(`Port ${port} is hot and ready for your requests.`);
});
