
// Types for disease prediction
export type Disease = {
  id: string;
  name: string;
  nameHi: string;
  probability: number;
  description: string;
  descriptionHi: string;
  treatment: string;
  treatmentHi: string;
  symptoms: string[];
  symptomsHi: string[];
  image?: string;
};

export type DiseasePredictionResponse = {
  status: 'success' | 'error';
  message?: string;
  predictions?: Disease[];
  topPrediction?: Disease;
};

// Function to predict diseases from an image
export const predictDiseaseFromImage = async (image: File): Promise<DiseasePredictionResponse> => {
  try {
    // Replace this with your actual ML model API endpoint
    const apiUrl = 'https://sugarcane-disease-prediction.onrender.com/predict'; // Replace with your actual API endpoint
    
    // For development, we'll return mock data
    if (process.env.NODE_ENV === 'development') {
      return getMockDiseaseData();
    }

    // Create form data for the image
    const formData = new FormData();
    formData.append('image', image);

    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Disease prediction API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error predicting disease:', error);
    return {
      status: 'error',
      message: 'Failed to predict disease. Please try again later.'
    };
  }
};

// Mock data for development
const getMockDiseaseData = (): DiseasePredictionResponse => {
  // List of possible sugarcane diseases
  const diseases: Disease[] = [
    {
      id: 'red-rot',
      name: 'Red Rot',
      nameHi: 'लाल सड़ांध',
      probability: 0.82,
      description: 'Red rot is a fungal disease causing reddening and drying of leaves, and internal rotting of stalks.',
      descriptionHi: 'लाल सड़ांध एक कवक रोग है जो पत्तियों के लाल होने और सूखने का कारण बनता है, और डंठलों के आंतरिक सड़ने का कारण बनता है।',
      treatment: 'Use disease-free seed cane, treat seed with fungicides, remove and destroy infected plants.',
      treatmentHi: 'रोग मुक्त बीज गन्ना का उपयोग करें, बीज को कवकनाशी से उपचारित करें, संक्रमित पौधों को हटाएं और नष्ट करें।',
      symptoms: [
        'Red discoloration in the internal tissues',
        'Drying of leaves from the tip downward',
        'Sour alcoholic smell from stalks',
        'White patches on leaves that later turn red'
      ],
      symptomsHi: [
        'आंतरिक ऊतकों में लाल रंगद्रव्य',
        'पत्तियों का सिरे से नीचे की ओर सूखना',
        'डंठलों से खट्टी शराबी गंध',
        'पत्तियों पर सफेद धब्बे जो बाद में लाल हो जाते हैं'
      ]
    },
    {
      id: 'smut',
      name: 'Smut',
      nameHi: 'कंडुआ',
      probability: 0.76,
      description: 'Smut is a fungal disease that causes whip-like structures to emerge from the top of the plant.',
      descriptionHi: 'कंडुआ एक कवक रोग है जो पौधे के ऊपर से चाबुक जैसी संरचनाओं को उभरने का कारण बनता है।',
      treatment: 'Use resistant varieties, treat seed with fungicides, remove and destroy infected plants.',
      treatmentHi: 'प्रतिरोधी किस्मों का उपयोग करें, बीज को कवकनाशी से उपचारित करें, संक्रमित पौधों को हटाएं और नष्ट करें।',
      symptoms: [
        'Whip-like structures emerging from the top',
        'Thin stalks',
        'Stunted growth',
        'Profuse tillering'
      ],
      symptomsHi: [
        'शीर्ष से चाबुक जैसी संरचनाओं का निकलना',
        'पतले डंठल',
        'बौना विकास',
        'प्रचुर मात्रा में टिलरिंग'
      ]
    },
    {
      id: 'leaf-scald',
      name: 'Leaf Scald',
      nameHi: 'पत्ता झुलसा',
      probability: 0.68,
      description: 'Leaf scald is a bacterial disease causing white pencil-line streaks on leaves that later turn red.',
      descriptionHi: 'पत्ता झुलसा एक जीवाणु रोग है जिससे पत्तियों पर सफेद पेंसिल-लाइन धारियाँ बनती हैं जो बाद में लाल हो जाती हैं।',
      treatment: 'Use disease-free seed, hot water treatment of seed cane, and resistant varieties.',
      treatmentHi: 'रोग मुक्त बीज का उपयोग करें, बीज गन्ने का गर्म पानी से उपचार करें, और प्रतिरोधी किस्मों का उपयोग करें।',
      symptoms: [
        'White pencil-line streaks on leaves',
        'Streaks turning reddish-brown',
        'Wilting',
        'Leaf necrosis'
      ],
      symptomsHi: [
        'पत्तियों पर सफेद पेंसिल-लाइन धारियाँ',
        'धारियाँ लालिमा-भूरी हो जाती हैं',
        'मुरझाना',
        'पत्ती नेक्रोसिस'
      ]
    },
    {
      id: 'yellow-leaf',
      name: 'Yellow Leaf Disease',
      nameHi: 'पीला पत्ती रोग',
      probability: 0.58,
      description: 'A viral disease causing yellowing of the midrib and adjacent tissues of leaves.',
      descriptionHi: 'एक वायरल रोग जो पत्तियों की मध्य शिरा और आसपास के ऊतकों के पीला होने का कारण बनता है।',
      treatment: 'Use disease-free seed cane, control aphid vectors, and plant resistant varieties.',
      treatmentHi: 'रोग मुक्त बीज गन्ना का उपयोग करें, एफिड वेक्टर्स को नियंत्रित करें, और प्रतिरोधी किस्मों को लगाएं।',
      symptoms: [
        'Yellowing of the midrib',
        'Yellowing spreading to adjacent tissues',
        'Reduced plant vigor',
        'Stunted growth'
      ],
      symptomsHi: [
        'मध्य शिरा का पीला होना',
        'पीलापन आसपास के ऊतकों में फैलना',
        'पौधे की जीवन शक्ति में कमी',
        'बौना विकास'
      ]
    }
  ];

  // Randomly select a disease with weighted probabilities
  const randomIndex = Math.floor(Math.random() * diseases.length);
  const selectedDisease = diseases[randomIndex];
  
  // Adjust other diseases' probabilities based on the selected one
  const otherDiseases = diseases
    .filter(d => d.id !== selectedDisease.id)
    .map(d => ({
      ...d,
      probability: Math.max(0, d.probability - Math.random() * 0.3)
    }))
    .sort((a, b) => b.probability - a.probability);
  
  const allPredictions = [selectedDisease, ...otherDiseases];
  
  return {
    status: 'success',
    predictions: allPredictions,
    topPrediction: selectedDisease
  };
};
