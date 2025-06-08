// translationUtils.js
// Simple utility for translation
export const translations = {
  en: {
    title: 'Predicting Crop Yields And Weather Impact For Farmers',
    subtitle: 'Helping farmers in Uttar Pradesh maximize their sugarcane production',
    heroText: 'Make data-driven decisions to improve your sugarcane yield with our advanced prediction system.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    featuresSectionTitle: 'Features',
    feature1Title: 'Accurate Yield Prediction',
    feature1Desc: 'Our system uses advanced algorithms to predict your sugarcane yield based on soil type, location, and weather data.',
    feature2Title: 'Disease Detection',
    feature2Desc: 'Upload photos of your sugarcane plants to identify diseases and get treatment recommendations.',
    feature3Title: 'Weather Insights',
    feature3Desc: 'Access real-time weather data and forecasts to plan your farming activities effectively.',
    feature4Title: 'WhatsApp Support',
    feature4Desc: 'Get assistance and updates directly on WhatsApp for convenient access to information.',
    connectWhatsApp: 'Connect to WhatsApp', // New entry for WhatsApp button
  },
  hi: {
    title: 'फसल उपज और मौसम प्रभाव का पूर्वानुमान किसानों के लिए',
    subtitle: 'उत्तर प्रदेश के किसानों को उनके गन्ना उत्पादन को अधिकतम करने में मदद करना',
    heroText: 'हमारी उन्नत भविष्यवाणी प्रणाली के साथ अपनी गन्ना उपज में सुधार के लिए डेटा-संचालित निर्णय लें।',
    getStarted: 'शुरू करें',
    learnMore: 'और जानें',
    featuresSectionTitle: 'विशेषताएं',
    feature1Title: 'सटीक उपज भविष्यवाणी',
    feature1Desc: 'हमारी प्रणाली मिट्टी के प्रकार, स्थान और मौसम डेटा के आधार पर आपकी गन्ना उपज की भविष्यवाणी करने के लिए उन्नत एल्गोरिदम का उपयोग करती है।',
    feature2Title: 'रोग पहचान',
    feature2Desc: 'रोगों की पहचान करने और उपचार की सिफारिशें प्राप्त करने के लिए अपने गन्ना के पौधों की तस्वीरें अपलोड करें।',
    feature3Title: 'मौसम अंतर्दृष्टि',
    feature3Desc: 'अपनी कृषि गतिविधियों की प्रभावी रूप से योजना बनाने के लिए रीयल-टाइम मौसम डेटा और पूर्वानुमान तक पहुंचें।',
    feature4Title: 'व्हाट्सएप समर्थन',
    feature4Desc: 'जानकारी तक सुविधाजनक पहुंच के लिए सीधे व्हाट्सएप पर सहायता और अपडेट प्राप्त करें।',
    connectWhatsApp: 'व्हाट्सएप से कनेक्ट करें', // New entry for WhatsApp button
  },
};

// Type for translation keys
export type TranslationKey = keyof typeof translations.en;

// Function to get translated text
export const getTranslation = (key: TranslationKey, language: 'en' | 'hi'): string => {
  return translations[language][key] || key;
};