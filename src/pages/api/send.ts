import nodemailer from 'nodemailer'
import { NextApiRequest, NextApiResponse } from 'next'

export default function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      user: 'joaoalves.cs@gmail.com',
      pass: 'hijbom-sIqwis-jenno0',
    },
  })

  transporter
    .sendMail({
      from: `Teste Tallentus <joaoalves.cs@gmail.com>`,
      to: 'joaoalves@outlook.com',
      replyTo: 'joaoalves1995@yahoo.com.br',
      subject: `Como é bom ter você aqui ❤️`,
      html: `Olá! João`,
    })
    .then((response) => {
      res.send(response)
    })
    .catch((error) => {
      res.send(error)
    })
}
