// SMS notification service
export const sendSMS = async (phoneNumber: string, message: string): Promise<void> => {
  try {
    // This would integrate with services like Twilio, AWS SNS, etc.
    console.log(`📱 SMS to ${phoneNumber}: ${message}`);
    // In production, integrate with actual SMS provider
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

export const sendTransactionSMS = async (
  phoneNumber: string,
  amount: number,
  type: string
) => {
  const message = `DITREVION Bank: ${type} of $${amount.toFixed(2)} successful. Check your account for details.`;
  await sendSMS(phoneNumber, message);
};
