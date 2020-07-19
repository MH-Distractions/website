import mailer from "nodemailer";

import * as register from "./register";

const templates = { register };

const transporter = mailer.createTransport({
  host: process.env.SMTP_HOSTNAME,
  port: 587,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendMail(subject, template, recipient, variables = {}) {
  let text = templates[template].text;
  let html = templates[template].html;
  for (let variable in variables) {
    let r = new RegExp(`{${variable}}`);

    text = text.replace(r, variables[variable]);
    html = html.replace(r, variables[variable]);
  }
  await transporter.sendMail({
    from: '"MH Distractions" <support@mhdistrations.com>',
    to: recipient,
    subject: subject,
    text: text,
    html: html,
  });
}
