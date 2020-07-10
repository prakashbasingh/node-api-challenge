const express = require("express");
const helmet = require("helmet");


const actionsRouter = require("./routers/actions-router.js");
const projectsRouter = require("./routers/projects-router.js");

const server = express();

server.use(express.json());
server.use(helmet());


server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);


server.get("/", (req, res) => {
    res.send("<h1> My 1st Backend Sprint Challenge </h1>");
});



module.exports = server;