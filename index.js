const express = require("express");
const app = express();
const http = require("http").createServer(app);
const fs = require("fs");
const path = require("path");
const io = require("socket.io")(http);

const SERVER_DATA = {
    current_quest_index: 0,
    statuses: {},
};

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.redirect("/quest?quest=0");
});

app.get("/quest", (req, res) => {
    const questNumber = req.query?.quest;

    if (!questNumber) {
        return res.status(400).send("Quest number is required");
    }

    const questPath = path.join(
        __dirname,
        "public",
        `quest-${questNumber}`,
        "index.html"
    );
    SERVER_DATA.current_quest_index = questNumber;
    res.sendFile(questPath);
});

app.get("/getstatus", (req, res) => {
    res.set("Content-Type", "application/json");
    res.json(SERVER_DATA);
});

app.get("/setrestart", (req, res) => {
    SERVER_DATA.current_quest_index = 0;
    SERVER_DATA.statuses = {};
    res.set("Content-Type", "application/json");
    res.json(SERVER_DATA);
});

app.get("/api/books", (req, res) => {
    res.send([
        { id: 1, title: "book 1" },
        { id: 2, title: "book 2" },
    ]);
});

app.get("/api/books/", (req, res) => {
    res.send([
        { id: 1, title: "book 1" },
        { id: 2, title: "book 2" },
    ]);
});

io.on("connection", (socket) => {
    const req = socket.request;
    socket.emit("initial data", JSON.stringify(SERVER_DATA));

    socket.on("quest update", (data) => {
        SERVER_DATA.statuses[data.id] = data.value;
        console.log(SERVER_DATA);
    });
});

http.listen(8080, () => {
    console.log("Server listen 8080");
});
