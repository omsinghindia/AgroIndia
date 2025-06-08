import React from 'react';

// Define guidelines outside the component
const guidelines = {
  summer: {
    sunny: {
      en: [
        "Maintain proper irrigation schedule - water every 5-7 days",
        "Apply mulching to retain soil moisture",
        "Best time for early morning irrigation",
        "Monitor for pests that thrive in warm conditions",
      ],
      hi: [
        "उचित सिंचाई कार्यक्रम बनाए रखें - हर 5-7 दिनों में पानी दें",
        "मिट्टी की नमी बनाए रखने के लिए मल्चिंग करें",
        "सुबह की सिंचाई का सबसे अच्छा समय",
        "गर्म परिस्थितियों में पनपने वाले कीटों की निगरानी करें",
      ],
      images: [
        { src: '/images/summer_sunny_1.jpg', caption: 'Irrigation schedule example' },
        { src: '/images/summer_sunny_2.png', caption: 'Mulching technique' },
        { src: '/images/summer_sunny_3.jpg', caption: 'Morning irrigation setup' },
        { src: '/images/summer_sunny_4.jpg', caption: 'Pest monitoring tool' },
      ],
    },
    cloudy: {
      en: [
        "Reduce irrigation frequency",
        "Watch for fungal disease development",
        "Monitor humidity levels",
        "Prepare for possible rain",
      ],
      hi: [
        "सिंचाई की आवृत्ति कम करें",
        "फफूंदी रोग के विकास पर नज़र रखें",
        "नमी के स्तर की निगरानी करें",
        "संभावित बारिश के लिए तैयार रहें",
      ],
      images: [
        { src: '/images/summer_cloudy_1.jpeg', caption: 'Reduced irrigation setup' },
        { src: '/images/summer_cloudy_2.jpg', caption: 'Fungal disease check' },
        { src: '/images/summer_cloudy_3.jpg', caption: 'Humidity monitor' },
        { src: '/images/summer_cloudy_4.jpg', caption: 'Rain preparation' },
      ],
    },
    rainy: {
      en: [
        "Ensure proper drainage",
        "Apply fungicides if needed",
        "Avoid waterlogging",
        "Monitor for disease outbreak",
      ],
      hi: [
        "उचित जल निकासी सुनिश्चित करें",
        "यदि आवश्यक हो तो फफूंदनाशक का प्रयोग करें",
        "जलभराव से बचें",
        "रोग प्रकोप की निगरानी करें",
      ],
      images: [
        { src: '/images/summer_rainy_1.jpg', caption: 'Drainage system' },
        { src: '/images/summer_rainy_2.jpg', caption: 'Fungicide application' },
        { src: '/images/summer_rainy_3.jpeg', caption: 'Waterlogging prevention' },
        { src: '/images/summer_cloudy_2.jpg', caption: 'Disease monitoring' },
      ],
    },
  },
  monsoon: {
    sunny: {
      en: [
        "Moderate irrigation - check soil moisture daily",
        "Apply organic manure to support growth",
        "Watch for weed growth",
        "Ensure good drainage preparation",
      ],
      hi: [
        "मध्यम सिंचाई - मिट्टी की नमी प्रतिदिन जांचें",
        "वृद्धि के लिए जैविक खाद का प्रयोग करें",
        "खरपतवार के विकास पर नजर रखें",
        "अच्छी जल निकासी की तैयारी सुनिश्चित करें",
      ],
      images: [
        { src: '/images/summer_cloudy_1.jpeg', caption: 'Moderate irrigation' },
        { src: '/images/monsoon_sunny_2.jpg', caption: 'Organic manure' },
        { src: '/images/monsoon_sunny_3.jpeg', caption: 'Weed control' },
        { src: '/images/summer_rainy_1.jpg', caption: 'Drainage prep' },
      ],
    },
    cloudy: {
      en: [
        "Reduce irrigation significantly",
        "Monitor for waterlogging and fungal issues",
        "Apply light fertilization",
        "Prepare for heavy rains",
      ],
      hi: [
        "सिंचाई को काफी कम करें",
        "जलभराव और फफूंदी समस्याओं की निगरानी करें",
        "हल्की उर्वरक डालें",
        "भारी बारिश के लिए तैयार रहें",
      ],
      images: [
        { src: '/images/summer_cloudy_1.jpeg', caption: 'Reduced irrigation' },
        { src: '/images/summer_rainy_3.jpeg', caption: 'Waterlogging check' },
        { src: '/images/monsoon_cloudy_3.jpg', caption: 'Light fertilization' },
        { src: '/images/summer_cloudy_4.jpeg', caption: 'Rain preparation' },
      ],
    },
    rainy: {
      en: [
        "Ensure drainage systems are functional",
        "Avoid additional watering",
        "Use disease-resistant varieties",
        "Check for root rot",
      ],
      hi: [
        "जल निकासी प्रणाली को कार्यशील सुनिश्चित करें",
        "अतिरिक्त पानी देने से बचें",
        "रोग-प्रतिरोधी किस्मों का उपयोग करें",
        "जड़ सड़न की जांच करें",
      ],
      images: [
        { src: '/images/summer_rainy_1.jpg', caption: 'Drainage system' },
        { src: '/images/monsoon_rainy_2.jpg', caption: 'No extra watering' },
        { src: '/images/monsoon_rainy_3.png', caption: 'Disease-resistant plants' },
        { src: '/images/monsoon_rainy_4.jpg', caption: 'Root rot check' },
      ],
    },
  },
  winter: {
    sunny: {
      en: [
        "Increase irrigation frequency if dry",
        "Protect from frost with mulching",
        "Apply balanced fertilizers",
        "Monitor for cold-related stress",
      ],
      hi: [
        "यदि शुष्क हो तो सिंचाई की आवृत्ति बढ़ाएं",
        "मल्चिंग के साथ ठंढ से बचाएं",
        "संतुलित उर्वरकों का प्रयोग करें",
        "ठंड से संबंधित तनाव की निगरानी करें",
      ],
      images: [
        { src: '/images/winter_sunny_1.jpg', caption: 'Increased irrigation' },
        { src: '/images/winter_sunny_2.jpg', caption: 'Frost protection' },
        { src: '/images/monsoon_cloudy_3.jpg', caption: 'Balanced fertilizers' },
        { src: '/images/winter_sunny_4.png', caption: 'Cold stress monitor' },
      ],
    },
    cloudy: {
      en: [
        "Maintain moderate irrigation",
        "Watch for reduced sunlight impact",
        "Use protective covers if needed",
        "Check soil temperature",
      ],
      hi: [
        "मध्यम सिंचाई बनाए रखें",
        "कम धूप के प्रभाव पर नजर रखें",
        "यदि आवश्यक हो तो सुरक्षात्मक कवर का उपयोग करें",
        "मिट्टी के तापमान की जांच करें",
      ],
      images: [
        { src: '/images/summer_cloudy_1.jpeg', caption: 'Moderate irrigation' },
        { src: '/images/winter_cloudy_2.png', caption: 'Sunlight impact' },
        { src: '/images/winter_cloudy_3.png', caption: 'Protective covers' },
        { src: '/images/winter_cloudy_4.jpg', caption: 'Soil temperature' },
      ],
    },
    rainy: {
      en: [
        "Ensure drainage to prevent waterlogging",
        "Avoid fertilizer application",
        "Protect plants from cold rains",
        "Monitor for fungal growth",
      ],
      hi: [
        "जलभराव से बचने के लिए जल निकासी सुनिश्चित करें",
        "उर्वरक लगाने से बचें",
        "ठंडी बारिश से पौधों की रक्षा करें",
        "फफूंदी विकास की निगरानी करें",
      ],
      images: [
        { src: '/images/summer_rainy_1.jpg', caption: 'Drainage setup' },
        { src: '/images/winter_rainy_2.jpeg', caption: 'No fertilizer' },
        { src: '/images/winter_rainy_3.jpg', caption: 'Cold rain protection' },
        { src: '/images/winter_rainy_4.png', caption: 'Fungal growth check' },
      ],
    },
  },
};

interface FarmingGuidelinesProps {
  weather: 'sunny' | 'cloudy' | 'rainy';
  season: 'summer' | 'monsoon' | 'winter';
  language: 'en' | 'hi';
  predictedYield?: number;
}

const FarmingGuidelines: React.FC<FarmingGuidelinesProps> = ({ weather, season, language, predictedYield }) => {
  console.log('FarmingGuidelines props:', { weather, season, language });
  const currentGuidelines = guidelines[season]?.[weather] || {
    en: ['No guidelines available.'],
    hi: ['कोई दिशानिर्देश उपलब्ध नहीं हैं।'], 
    images: [
      { src: '/fallback-image.jpg', caption: 'Fallback image' },
      { src: '/fallback-image2.jpg', caption: 'Fallback image' },
      { src: '/fallback-image3.jpeg', caption: 'Fallback image' },
      { src: '/fallback-image4.jpg', caption: 'Fallback image' },
    ],
  };
  console.log('currentGuidelines:', currentGuidelines);

  return (
    <div className="bg-green-50 rounded-lg shadow-md p-6 border border-green-200">
      <h2 className="text-2xl font-bold text-green-800 mb-6">
        {language === 'en' ? 'Farming Guidelines' : 'कृषि दिशानिर्देश'}
      </h2>

      <div className="space-y-6">
        <div className="bg-green-100 rounded-lg p-4">
          <h3 className="text-xl font-semibold text-green-900">
            {language === 'en' ? 'Current Conditions' : 'वर्तमान स्थिति'}
          </h3>
          <div className="mt-2 space-y-1 text-sm text-green-800">
            <p>
              {language === 'en' ? 'Weather:' : 'मौसम:'} <span className="font-medium">{weather}</span>
            </p>
            <p>
              {language === 'en' ? 'Season:' : 'ऋतु:'} <span className="font-medium">{season}</span>
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium text-green-900 mb-3">
            {language === 'en' ? 'Recommended Practices' : 'अनुशंसित प्रथाएं'}
          </h4>
          <ul className="list-disc pl-6 space-y-2 text-green-700">
            {(language === 'en' ? currentGuidelines.en : currentGuidelines.hi).map((item, index) => (
              <li key={index} className="text-base">{item}</li>
            ))}
          </ul>
        </div>

        <div>
  <h4 className="text-lg font-medium text-green-900 mb-3">
    {language === 'en' ? 'Visual Guidelines' : 'दृश्य दिशानिर्देश'}
  </h4>
  <div className="grid grid-cols-2 gap-4">
    {currentGuidelines.images.map((image, index) => (
      <div key={index} className="text-center">
        <img
          src={image.src}
          alt={`${language === 'en' ? 'Image' : 'छवि'} ${index + 1}`}
          className="w-full h-80 object-cover rounded-lg shadow-md" // Changed h-48 to h-80 for larger size, square aspect
          onError={(e) => { console.log('Image load failed:', e.currentTarget.src); e.currentTarget.src = '/fallback-image.jpg'; }}
        />
        <p className="text-sm text-gray-600 mt-2">{language === 'en' ? image.caption : {
          'Irrigation schedule example': 'सिंचाई कार्यक्रम का उदाहरण',
          'Mulching technique': 'मल्चिंग तकनीक',
          'Morning irrigation setup': 'सुबह की सिंचाई सेटअप',
          'Pest monitoring tool': 'कीट निगरानी उपकरण',
          'Reduced irrigation setup': 'कम सिंचाई सेटअप',
          'Fungal disease check': 'फफूंदी रोग जांच',
          'Humidity monitor': 'नमी मॉनिटर',
          'Rain preparation': 'बारिश की तैयारी',
          'Drainage system': 'जल निकासी प्रणाली',
          'Fungicide application': 'फफूंदनाशक प्रयोग',
          'Waterlogging prevention': 'जलभराव रोकथाम',
          'Disease monitoring': 'रोग निगरानी',
          'Moderate irrigation': 'मध्यम सिंचाई',
          'Organic manure': 'जैविक खाद',
          'Weed control': 'खरपतवार नियंत्रण',
          'Drainage prep': 'जल निकासी तैयारी',
          'Waterlogging check': 'जलभराव जांच',
          'Light fertilization': 'हल्की उर्वरक',
          'No extra watering': 'कोई अतिरिक्त पानी नहीं',
          'Disease-resistant plants': 'रोग-प्रतिरोधी पौधे',
          'Root rot check': 'जड़ सड़न जांच',
          'Increased irrigation': 'बढ़ी हुई सिंचाई',
          'Frost protection': 'ठंढ सुरक्षा',
          'Balanced fertilizers': 'संतुलित उर्वरक',
          'Cold stress monitor': 'ठंड तनाव मॉनिटर',
          'Sunlight impact': 'धूप का प्रभाव',
          'Protective covers': 'सुरक्षात्मक कवर',
          'Soil temperature': 'मिट्टी का तापमान',
          'Drainage setup': 'जल निकासी सेटअप',
          'No fertilizer': 'कोई उर्वरक नहीं',
          'Cold rain protection': 'ठंडी बारिश सुरक्षा',
          'Fungal growth check': 'फफूंदी विकास जांच',
          'Fallback image': 'बैकअप छवि',
        }[image.caption] || image.caption}</p>
      </div>
    ))}
  </div>
</div>

        {predictedYield !== undefined && predictedYield !== null && (
          <div className="mt-6">
            {/* <h4 className="text-lg font-medium text-green-900 mb-2">
              {language === 'en' ? 'Predicted Yield' : 'अनुमानित उपज'}
            </h4>
            <p className="text-green-700 text-lg">
              {predictedYield} {language === 'en' ? 'quintals' : 'क्विंटल'}
            </p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmingGuidelines;