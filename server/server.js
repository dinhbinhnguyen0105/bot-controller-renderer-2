import express from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello world, this is a virtual server.");
});

app.get("/robot", (req, res) => {
    const bufferDB = fs.readFileSync(path.join(__dirname, "robotUID.json"));
    const robotDB = JSON.parse(bufferDB);
    res.send({
        message: "Success",
        status: true,
        data: robotDB,
    });
});

app.use((req, res, next) => {
    res.status(404).send("The requested page could not be found.");
});
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});


