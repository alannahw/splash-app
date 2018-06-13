// routes/email_routes.js
const nodemailer = require("nodemailer");

module.exports = function(app, db) {
  app.post("/api/email", (req, res) => {
    const { body, title, date, unsplashId, recipient, subject } = req.body;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "splash.creative.writing@gmail.com", // Your email id
        pass: "" // Your password
      }
    });

    const emailDetails = {
      from: "splash.creative.writing@gmail.com", // sender address
      to: recipient, // list of receivers
      subject: subject, // Subject line
      // need to template
      html:
        "<img src=https://picsum.photos/960/300/?image=" +
        unsplashId +
        " />" +
        "<h1 style='text-align:center;'>" +
        title +
        "</h1>" +
        "<p style='text-align:center;'>" +
        date +
        "</p>" +
        body
    };
    transporter.sendMail(emailDetails, function(error, info) {
      if (error) {
        res.json({ yo: "error" });
      } else {
        console.log("Message sent: " + info.response, info);
        res.json({ yo: info.response });
      }
    });
  });
};
