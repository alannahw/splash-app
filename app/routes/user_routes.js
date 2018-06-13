// routes/user_routes.js
const ObjectID = require("mongodb").ObjectID;

module.exports = function(app, db) {
  app.get("/users/:name", (req, res) => {
    const name = req.params.name;
    const details = { name: name };

    db.collection("users").findOne(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else if (!item) {
        res.send({ error: "not found" });
      } else {
        res.send(item);
      }
    });
  });
  app.get("/users", (req, res) => {
    const details = {};
    db
      .collection("users")
      .find()
      .toArray((err, items) => {
        if (err) {
          res.send({ error: "An error has occurred" });
        } else {
          res.send(items);
        }
      });
  });
  app.post("/users", (req, res) => {
    const user = { name: req.body.name, settings: req.body.settings };
    db
      .collection("users")
      .find(user)
      .toArray(function(err, results) {
        if (results.length) {
          res.send({ error: "username taken" });
        } else {
          db.collection("users").insert(user, (err, result) => {
            if (err) {
              res.send({ error: "An error has occurred" });
            } else {
              res.send(result.ops[0]);
            }
          });
        }
      });
  });
  app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };

    db.collection("users").remove(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send("User " + item.name + " deleted!");
      }
    });
  });
  app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    const user = { name: req.body.name, settings: req.body.settings };
    db
      .collection("users")
      .findOneAndUpdate(
        details,
        user,
        { returnOriginal: false },
        (err, result) => {
          if (err) {
            res.send({ error: "An error has occurred" });
          } else {
            res.send(result.value);
          }
        }
      );
  });
};
