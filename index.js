const express = require("express");
const app = express();
const http = require("http").createServer(app);

app.get("/api/books", (req, res) => {
    res.send([
        { id: 1, title: "book 1" },
        { id: 2, title: "book 2" },
    ]);
});

http.listen(8080, () => {
    console.log("Server listening on port 8080");
});
