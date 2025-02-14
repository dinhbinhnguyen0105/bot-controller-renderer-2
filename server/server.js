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

app.get("/user/list", async (req, res) => {
    const bufferDB = fs.readFileSync(path.join(__dirname, "robotUID.json"));
    const userDB = JSON.parse(bufferDB);
    if (req.query.uid) {
        if (req.query.action) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            res.send({
                message: `Simulate ${req.query.action} action`,
                status: true,
                data: { uid: req.query.uid, action: req.query.action },
            });
        };
    } else {
        res.send({
            message: "Success",
            status: true,
            data: userDB,
        });
    };
});

app.post("/user/create", (req, res) => {
    const bufferDB = fs.readFileSync(path.join(__dirname, "robotUID.json"));
    const userDB = JSON.parse(bufferDB);
    const payload = req.body.payload.map(userInfo => ({
        info: userInfo,
    }));
    const newData = [...userDB, ...payload];

    fs.writeFileSync(path.join(__dirname, "robotUID.json"), JSON.stringify(newData), { encoding: "utf8" })
    res.send({
        message: "Data saved successfully to the database.",
        status: true,
        data: true,
    });
});
app.put("/user/list/:userUID", (req, res) => {
    const userUID = req.params.userUID;
    const bufferDB = fs.readFileSync(path.join(__dirname, "robotUID.json"));
    const userDB = JSON.parse(bufferDB);

    const currentUser = userDB.find(item => item.info.uid === userUID);
    if (!currentUser) { return; };

    // modify database
    const newuserDB = userDB.map(item => {
        if (item.info.uid === userUID) {
            return {
                ...item,
                info: { ...item.info, ...(req.body.payload.info || {}) },
                actions: { ...item.actions, ...(req.body.payload.actions || {}) },
            }
        } else { return item; };
    });
    fs.writeFileSync(path.join(__dirname, "robotUID.json"), JSON.stringify(newuserDB), { encoding: "utf8" })
    //
    res.send({
        message: "Success",
        status: true,
        data: {
            ...currentUser,
            info: { ...currentUser.info, ...(req.body.payload.info || {}) },
            actions: { ...currentUser.actions, ...(req.body.payload.actions || {}) },
        },
    });
});

app.use((req, res, next) => {
    res.status(404).send("The requested page could not be found.");
});
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});


