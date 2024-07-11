const express = require("express");
const app = express();
const http = require("http").createServer(app);
const fs = require("fs");
const path = require("path");
const io = require("socket.io")(http);
const url = require('url');

const SERVER_DATA = {
    current_quest_index: 0,
    statuses: {}
}

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.redirect("/quest?quest=0");
});

app.get("/quest", (req, res) => {
    const questNumber = req.query?.quest;

    if(!questNumber){
        return res.status(400).send("Quest number is required");
    }
    
    const questPath = path.join(__dirname, "public", `quest-${questNumber}`, "index.html");
    SERVER_DATA.current_quest_index = questNumber;
    res.sendFile(questPath);
});

io.on("connection", (socket) => {
    const req = socket.request;
    socket.emit('initial data', SERVER_DATA);

    socket.on('quest update', (data) => {
        SERVER_DATA.statuses[data.id] = data.value;
        console.log(SERVER_DATA);
    });
});

function isFinished(quest_id){
    let statuses = SERVER_DATA.statuses;
    if(statuses[quest_id] == "finished"){
        return true;
    }
    return false;
}

http.listen(3000, () => {
    console.log("Server listen 3000");
});