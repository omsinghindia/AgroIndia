import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { phoneNumber } = req.body;

    // Send WhatsApp message using Twilio
    const message = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, // Your Twilio WhatsApp number
      to: `whatsapp:${phoneNumber}`,
      body: 'Welcome to AgroIndia! You are now connected to our WhatsApp service. You can ask questions about farming anytime.',
    });

    return res.status(200).json({ 
      success: true, 
      message: 'WhatsApp connection initiated',
      messageId: message.sid 
    });

  } catch (error) {
    console.error('Twilio Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to connect to WhatsApp' 
    });
  }
} 