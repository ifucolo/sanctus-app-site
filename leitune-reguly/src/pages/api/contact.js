import * as fs from 'fs';
import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey('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');

const template = (data) => `
<div style="max-width: 800px">
    <h2>Novo Contato</h2>
    <h3>${data.name}</h3>
    <h3>${data.email}</h3>
    <h3>${data.phone}</h3>
    <p>${data.message}</p>
</div>
`;

export default async (req, res) => {
  if (req.method === 'POST') {
    const attachments = []
    if (req.body.file) {
      const attachment = fs.readFileSync(req.body.file).toString('base64');
      attachments.push({
        content: attachment,
        filename: "attachment.pdf",
        type: "application/pdf",
        disposition: "attachment"
      })
    }

    const msg = {
      // to: 'matheus.konradt.conceicao@gmail.com',
      to: 'hello@leitunereguly.com',
      from: 'leitunereguly.com <hello@leitunereguly.com>',
      subject: 'Contato do site',
      html: template(req.body),
      replyTo: req.body.email,
      attachments,
    };
    try {
      await sgMail.send(msg);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: 1 }));
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: e }));
    }
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Not Found' }))
  }
}
