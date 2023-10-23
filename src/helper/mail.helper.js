module.exports.sendEmail = async (
  candidateEmail,
  employerEmail,
  interviewDetail,
  feedbackId
) => {
  const emailContent = `
  <html>
    <body>
      <h2>Interview Details</h2>
      <p>Date: ${new Date(interviewDetail.date)}</p>
      <p>Start Time: ${interviewDetail.startTime}</p>
      <p>End Time: ${interviewDetail.endTime}</p>
      <a>Interview Link : ${interviewDetail.interViewLink}</a>
      <p>Dear</p>
      <p>This is to inform you about the details of your upcoming interview.</p>
      <!-- Add more content here -->
    </body>
  </html>
`;
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const emailToEmployer = {
    from: process.env.EMAIL_USERNAME,
    to: employerEmail,
    subject: "Hello from hiring team",
    text: "Message from hiring team",
    html: `Click <a href="${process.env.RESET_URL_LOCAL}/${feedbackId}">here</a> click to give feedback to candidate.
    ${emailContent}`,
  };
  const emailToCandidate = {
    from: process.env.EMAIL_USERNAME,
    to: candidateEmail,
    subject: "Hello from hiring team",
    text: "Message from hiring team",
    html: emailContent,
  };
  await transporter.sendMail(emailToEmployer);
  await transporter.sendMail(emailToCandidate);
};
