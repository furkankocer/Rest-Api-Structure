const express = require("express")
require("./db/mongoose")
const taskRouter = require("./routers/task")
const userRouter = require("./routers/user")
const bodyParser = require("body-parser");

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(taskRouter)
app.use(userRouter)

const port = process.env.PORT || 3000

app.listen(port, () =>{
    console.log("Server is up on port: " + port)
})

app.use("*", (req, res) => {
    res.status(404).send({ url: req.originalUrl + " not found" });
  });