const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes/route");
const noterouter = require("./routes/notesroute");
dotenv.config();
const app = express();
const port = process.env.PORT;
require("./db/conn");
app.use(cors());
app.use(express.json());
app.use("/api/v1/", router);
app.use("/api/notes/", noterouter);


app.listen(port, () => console.log(`Listening on ${port} ...`));
