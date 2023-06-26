const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Books = require("./books");
const port = 3000 || process.env.PORT;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.mongoUrl).then(() => {
    console.log("connected to db");
  });
}

app.use(express.json());
app.use("/", Books);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
