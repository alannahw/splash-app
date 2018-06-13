// routes/note_routes.js
const ObjectID = require("mongodb").ObjectID;

module.exports = function(app, db) {
  app.get("/notes/note/:noteId", (req, res) => {
    const id = req.params.noteId;
    const details = { _id: new ObjectID(id) };
    db.collection("notes").findOne(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(item);
      }
    });
  });
  app.get("/notes/user/:userId", (req, res) => {
    const userId = req.params.userId;
    const details = { userId: userId };
    db
      .collection("notes")
      .find(details)
      .toArray((err, items) => {
        if (err) {
          res.send({ error: "An error has occurred" });
        } else if (!items) {
          res.send({ error: "no items" });
        } else {
          res.send(items);
        }
      });
  });
  app.post("/notes", (req, res) => {
    const { body, title, userId, date, unsplashId } = req.body;
    const note = {
      body: body,
      title: title,
      userId: userId,
      date: date,
      unsplashId: unsplashId
    };
    db.collection("notes").insert(note, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  app.delete("/notes/note/:noteId", (req, res) => {
    const id = req.params.noteId;
    const details = { _id: new ObjectID(id) };
    db.collection("notes").deleteOne(details, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(result);
      }
    });
  });
  app.put("/notes/note/:id", (req, res) => {
    const { body, title, unsplashId, date, userId, imgLink } = req.body;
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    const note = {
      body: body,
      title: title,
      unsplashId: unsplashId,
      date: date,
      userId: userId,
      imgLink: imgLink
    };
    db
      .collection("notes")
      .findOneAndUpdate(
        details,
        note,
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
