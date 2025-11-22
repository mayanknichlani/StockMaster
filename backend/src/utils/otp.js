// Utility to handle OTP generation and "sending"

const generateOTP = () => {
  // Generates a 6-digit numeric string
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = async (email, otp) => {
  // In a real application, integration with Nodemailer or Twilio happens here.
  // For development, we log it to the console.
  console.log(`==================================================`);
  console.log(`[OTP SERVICE] Sending OTP to ${email}: ${otp}`);
  console.log(`==================================================`);
  return true;
};

module.exports = { generateOTP, sendOTP };