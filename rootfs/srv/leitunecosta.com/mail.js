const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: "26f60b38884d49d9689619acc533e0c7-65b08458-9e1decd9",
    domain: "sandbox234a2652ebd246aa98c2738e1d19615d.mailgun.org",
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, name, text, cb) => {
  const mailOptions = {
    from: email,
    to: "marianaleitune@gmail.com",
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
