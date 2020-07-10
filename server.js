const express = require("express");
const helmet = require("helmet");


const actionsRouter = require("./actions/actions-router.js");
const projectsRouter = require("./projects/projects-router.js");

const server = express();

server.use(express.json());
server.use(helmet());


server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);


server.get("/", (req, res) => {
    const message = process.env.MESSAGE;
    
    res.status(200).json(message);
});



module.exports = server;