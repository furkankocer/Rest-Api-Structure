const express = require("express")
require("./db/mongoose")
const taskRouter = require("./routers/task")
const bodyParser = require("body-parser");

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(taskRouter)

const port = process.env.PORT || 3000

app.listen(port, () =>{
    console.log("Server is up on port: " + port)
})

app.use("*", (req, res) => {
    res.status(404).send({ url: req.originalUrl + " not found" });
  });