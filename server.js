const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./config/db");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "client", "build")));
//
// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);
  // Make sure you add the database name and not the collection name
  const db = database.db("noteapp");
  require("./app/routes")(app, db);
  app.listen(port, () => {
    console.log("We are live on " + port);
  });
});
