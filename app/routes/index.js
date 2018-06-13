// routes/index.js
const noteRoutes = require("./note_routes");
const userRoutes = require("./user_routes");
const emailRoutes = require("./email_routes");
module.exports = function(app, db) {
  noteRoutes(app, db);
  userRoutes(app, db);
  emailRoutes(app, db);
  // Other route groups could go here, in the future
};
