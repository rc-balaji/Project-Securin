require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cveRoutes = require("./routes/CVERoutes");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/cves/",cveRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});