// Email service for notifications
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });
    console.log(`✉️  Email sent to ${to}`);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
};

export const sendTransferNotification = async (
  email: string,
  senderName: string,
  amount: number,
  receiptId: string
) => {
  const html = `
    <h2>Transfer Received</h2>
    <p>You received $${amount.toFixed(2)} from ${senderName}</p>
    <p>Receipt ID: ${receiptId}</p>
    <p>Date: ${new Date().toLocaleString()}</p>
  `;
  await sendEmail(email, 'Transfer Received', html);
};

export const sendLoanApprovalEmail = async (
  email: string,
  loanAmount: number,
  monthlyEMI: number
) => {
  const html = `
    <h2>Loan Approved</h2>
    <p>Your loan application has been approved!</p>
    <p>Loan Amount: $${loanAmount.toFixed(2)}</p>
    <p>Monthly EMI: $${monthlyEMI.toFixed(2)}</p>
    <p>Log in to your account to check details</p>
  `;
  await sendEmail(email, 'Loan Approved', html);
};
