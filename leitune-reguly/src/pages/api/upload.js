import * as formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};


export default (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./uploads";
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ files });
    }
  });
}
