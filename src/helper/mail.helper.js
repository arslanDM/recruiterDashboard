module.exports.sendEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Hello from Renav",
    text: "Message from Renav",
    html: `Click <a href="${process.env.RESET_URL_LOCAL}/${token}">here</a> to verify your email.`,
  };

  await transporter.sendMail(mailOptions);
};
