const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: "0e5b4f9fb2bea0198b2d9a835af6b2c7-915161b7-74602636",
    domain: "sandbox2eb95f3743f64837b2e6a5a8cf2fe00c.mailgun.org",
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, name, text, cb) => {
  const mailOptions = {
    from: email,
    to: "lazaroairespereira@gmail.com",
    subject: name,
    text: text
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
}

module.exports = sendMail;
