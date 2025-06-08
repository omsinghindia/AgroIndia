import express from 'express';
import twilio from 'twilio';

const app = express();
app.use(express.json());

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// /api/whatsapp-connect endpoint
app.post('/api/whatsapp-connect', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log('Received phoneNumber:', phoneNumber); // Debug log

    const message = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${phoneNumber}`,
      body: 'Welcome to AgriConnect! You are now connected to our WhatsApp service. You can ask questions about sugarcane farming anytime.',
    });

    res.json({ success: true, message: 'WhatsApp connection initiated', messageId: message.sid });
  } catch (error) {
    console.error('Twilio Error:', error);
    res.status(500).json({ success: false, message: 'Failed to connect to WhatsApp' });
  }
});

// /api/whatsapp-webhook endpoint
app.post('/api/whatsapp-webhook', (req, res) => {
  const twiml = new twilio.twiml.MessagingResponse();
  const incomingMsg = req.body.Body.toLowerCase();

  if (incomingMsg.startsWith('yield')) {
    const parts = incomingMsg.split(' ').slice(1);
    if (parts.length === 3) {
      const [district, areaStr, soilType] = parts;
      const area = parseFloat(areaStr);
      const areaFactor = areaStr.includes('hectare') ? 2.47 : 1;
      const soilMultipliers = { alluvial: 90, clayLoam: 75, sandyLoam: 65, loam: 85, clayey: 60 };
      const districtFactors = {
        lucknow: 1.15, kanpur: 1.05, meerut: 1.25, bareilly: 1.15, moradabad: 1.1,
        aligarh: 1.05, saharanpur: 1.2, gorakhpur: 1.1, faizabad: 1.05, jhansi: 0.95,
      };

      if (!isNaN(area) && soilMultipliers[soilType] && districtFactors[district.toLowerCase()]) {
        const yieldPerAcre = soilMultipliers[soilType] * districtFactors[district.toLowerCase()];
        const totalYield = yieldPerAcre * area * areaFactor;
        twiml.message(`Predicted yield: ${Math.round(totalYield)} quintals`);
      } else {
        twiml.message('Invalid input. Use: yield <district> <area> <soil> (e.g., yield Lucknow 5 alluvial)');
      }
    } else {
      twiml.message('Please provide district, area, and soil type. Example: yield Lucknow 5 alluvial');
    }
  } else if (incomingMsg.includes('help')) {
    twiml.message('Send "yield <district> <area> <soil>" to predict yield. Example: yield Lucknow 5 alluvial');
  } else {
    twiml.message('Hi! Send "help" for instructions or "yield" to predict sugarcane yield.');
  }

  res.set('Content-Type', 'text/xml');
  res.status(200).send(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});