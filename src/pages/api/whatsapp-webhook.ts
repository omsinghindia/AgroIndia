// pages/api/whatsapp-webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Verify the request is from Twilio
  const twilioSignature = req.headers['x-twilio-signature'] as string | string[] | undefined;
  const url = process.env.WEBHOOK_URL; // Your ngrok URL (e.g., https://abcd1234.ngrok.io/api/whatsapp-webhook)
  const params = req.body;

  if (!twilioSignature || !twilio.validateRequest(
    process.env.TWILIO_AUTH_TOKEN!,
    Array.isArray(twilioSignature) ? twilioSignature[0] : twilioSignature,
    url!,
    params
  )) {
    return res.status(401).json({ message: 'Invalid request signature' });
  }

  try {
    const incomingMsg = req.body.Body.toLowerCase();
    const from = req.body.From;

    // Process the message and generate response
    const response = new twilio.twiml.MessagingResponse();

    if (incomingMsg.startsWith('yield')) {
      const parts = incomingMsg.split(' ').slice(1);
      if (parts.length === 3) {
        const [district, areaStr, soilType] = parts;
        const area = parseFloat(areaStr);
        const areaFactor = areaStr.includes('hectare') ? 2.47 : 1; // Crude unit detection
        const soilMultipliers = { alluvial: 90, clayLoam: 75, sandyLoam: 65, loam: 85, clayey: 60 };
        const districtFactors = {
          lucknow: 1.15, kanpur: 1.05, meerut: 1.25, bareilly: 1.15, moradabad: 1.1,
          aligarh: 1.05, saharanpur: 1.2, gorakhpur: 1.1, faizabad: 1.05, jhansi: 0.95,
        };

        if (!isNaN(area) && soilMultipliers[soilType] && districtFactors[district.toLowerCase()]) {
          const yieldPerAcre = soilMultipliers[soilType] * districtFactors[district.toLowerCase()];
          const totalYield = yieldPerAcre * area * areaFactor;
          response.message(`Predicted yield: ${Math.round(totalYield)} quintals`);
        } else {
          response.message('Invalid input. Use: yield <district> <area> <soil> (e.g., yield Lucknow 5 alluvial)');
        }
      } else {
        response.message('Please provide district, area, and soil type. Example: yield Lucknow 5 alluvial');
      }
    } else if (incomingMsg.includes('help')) {
      response.message('Send "yield <district> <area> <soil>" to predict yield. Example: yield Lucknow 5 alluvial');
    } else {
      response.message('Hi! Send "help" for instructions or "yield" to predict yield.');
    }

    res.setHeader('Content-Type', 'text/xml');
    return res.status(200).send(response.toString());

  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}