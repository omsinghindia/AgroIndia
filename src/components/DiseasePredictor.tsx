import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Check, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

type DiseasePredictorProps = {
  language: 'en' | 'hi';
};

type DiseaseResult = {
  name: string;
  nameHi: string;
  probability: number;
  description: string;
  descriptionHi: string;
  treatment: string;
  treatmentHi: string;
};

// Updated disease database to match model classes
const diseases: DiseaseResult[] = [
  {
    name: 'Healthy',
    nameHi: 'स्वस्थ',
    probability: 0,
    description: 'The plant shows no signs of disease and appears healthy.',
    descriptionHi: 'पौधे में रोग के कोई लक्षण नहीं दिखते और यह स्वस्थ प्रतीत होता है।',
    treatment: 'No treatment required. Maintain good agricultural practices.',
    treatmentHi: 'कोई उपचार की आवश्यकता नहीं है। अच्छी कृषि प्रथाओं को बनाए रखें।',
  },
  {
    name: 'Mosaic',
    nameHi: 'मोज़ेक',
    probability: 0,
    description: 'Mosaic is a viral disease causing mottled or mosaic-like patterns on leaves.',
    descriptionHi: 'मोज़ेक एक वायरल रोग है जो पत्तियों पर धब्बेदार या मोज़ेक जैसी पैटर्न पैदा करता है।',
    treatment: 'Use virus-free planting material, control aphid vectors, remove infected plants.',
    treatmentHi: 'वायरस मुक्त रोपण सामग्री का उपयोग करें, एफिड वेक्टर को नियंत्रित करें, संक्रमित पौधों को हटाएं।',
  },
  {
    name: 'RedRot',
    nameHi: 'लाल सड़ांध',
    probability: 0,
    description: 'Red rot is a fungal disease causing reddening and drying of leaves, and internal rotting of stalks.',
    descriptionHi: 'लाल सड़ांध एक कवक रोग है जो पत्तियों के लाल होने और सूखने का कारण बनता है, और डंठलों के आंतरिक सड़ने का कारण बनता है।',
    treatment: 'Use disease-free seed cane, treat seed with fungicides, remove and destroy infected plants.',
    treatmentHi: 'रोग मुक्त बीज गन्ना का उपयोग करें, बीज को कवकनाशी से उपचारित करें, संक्रमित पौधों को हटाएं और नष्ट करें।',
  },
  {
    name: 'Rust',
    nameHi: 'जंग',
    probability: 0,
    description: 'Rust is a fungal disease causing orange or brown pustules on leaves.',
    descriptionHi: 'जंग एक कवक रोग है जो पत्तियों पर नारंगी या भूरी फुंसियाँ पैदा करता है।',
    treatment: 'Apply fungicides, use resistant varieties, ensure proper spacing for air circulation.',
    treatmentHi: 'कवकनाशी का प्रयोग करें, प्रतिरोधी किस्मों का उपयोग करें, हवा के संचरण के लिए उचित दूरी सुनिश्चित करें।',
  },
  {
    name: 'Yellow',
    nameHi: 'पीलापन',
    probability: 0,
    description: 'Yellowing may indicate nutrient deficiency, water stress, or an unidentified disease.',
    descriptionHi: 'पीलापन पोषक तत्वों की कमी, पानी की तनाव, या किसी अज्ञात रोग को दर्शा सकता है।',
    treatment: 'Check soil nutrients, adjust irrigation, consult an expert if persistent.',
    treatmentHi: 'मिट्टी के पोषक तत्वों की जाँच करें, सिंचाई को समायोजित करें, यदि लगातार रहे तो विशेषज्ञ से परामर्श करें।',
  },
];

const DiseasePredictor = ({ language }: DiseasePredictorProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    if (files.length === 0) return;

    const file = files[0];

    if (!file.type.startsWith('image/')) {
      setError(
        language === 'en'
          ? 'Please upload an image file (JPEG, PNG)'
          : 'कृपया एक छवि फ़ाइल अपलोड करें (JPEG, PNG)'
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        language === 'en'
          ? 'Image size should be less than 5MB'
          : 'छवि का आकार 5MB से कम होना चाहिए'
      );
      return;
    }

    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
        analyzeDiseaseImage(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const analyzeDiseaseImage = async (file: File) => {
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { disease, probability } = response.data;
      const diseaseInfo = diseases.find((d) => d.name === disease) || {
        name: disease,
        nameHi: disease,
        probability,
        description: language === 'en' ? 'No description available.' : 'कोई विवरण उपलब्ध नहीं है।',
        descriptionHi: 'कोई विवरण उपलब्ध नहीं है।',
        treatment: language === 'en' ? 'Consult an expert for treatment.' : 'उपचार के लिए विशेषज्ञ से परामर्श करें।',
        treatmentHi: 'उपचार के लिए विशेषज्ञ से परामर्श करें।',
      };

      setResult({
        ...diseaseInfo,
        probability,
      });
    } catch (err) {
      setError(
        language === 'en'
          ? 'Error analyzing image. Please try again.'
          : 'छवि का विश्लेषण करने में त्रुटि। कृपया पुनः प्रयास करें।'
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetImage = () => {
    setImage(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div id="disease" className="w-full">
      <motion.div
        className="neo-card p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-medium text-gray-800 mb-6">
          {language === 'en' ? 'Disease Detection' : 'रोग पहचान'}
        </h2>

        {!image ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragging
                ? 'border-sugarcane-500 bg-sugarcane-50'
                : 'border-gray-300 hover:border-sugarcane-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              <Upload size={48} className="text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                {language === 'en' ? 'Upload Plant Image' : 'पौधे की छवि अपलोड करें'}
              </h3>
              <p className="text-sm text-gray-500 mb-6 max-w-md">
                {language === 'en'
                  ? 'Drag and drop an image here, or click to select a file'
                  : 'यहां एक छवि खींचें और छोड़ें, या फ़ाइल चुनने के लिए क्लिक करें'}
              </p>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-sugarcane-600 text-white rounded-lg hover:bg-sugarcane-700 transition-colors"
              >
                {language === 'en' ? 'Select Image' : 'छवि चुनें'}
              </motion.button>
              <p className="text-xs text-gray-500 mt-4">
                {language === 'en'
                  ? 'Supported formats: JPEG, PNG (max 5MB)'
                  : 'समर्थित प्रारूप: JPEG, PNG (अधिकतम 5MB)'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <img
                src={image}
                alt="Uploaded plant image"
                className="w-full h-auto max-h-[400px] object-contain rounded-lg border border-gray-200"
              />
              <button
                onClick={resetImage}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-6">
                <Loader2 size={40} className="text-sugarcane-600 animate-spin mb-4" />
                <p className="text-gray-600">
                  {language === 'en'
                    ? 'Analyzing image... Please wait.'
                    : 'छवि का विश्लेषण किया जा रहा है... कृपया प्रतीक्षा करें।'}
                </p>
              </div>
            ) : result ? (
              <motion.div
                className="bg-white border border-gray-200 rounded-lg p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      result.probability > 0.8
                        ? 'bg-red-500'
                        : result.probability > 0.6
                        ? 'bg-yellow-500'
                        : 'bg-orange-500'
                    }`}
                  ></div>
                  <h3 className="text-xl font-medium">
                    {language === 'en' ? result.name : result.nameHi}
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({Math.round(result.probability * 100)}%{' '}
                      {language === 'en' ? 'confidence' : 'विश्वास'})
                    </span>
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      {language === 'en' ? 'Description:' : 'विवरण:'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'en' ? result.description : result.descriptionHi}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      {language === 'en' ? 'Treatment:' : 'उपचार:'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'en' ? result.treatment : result.treatmentHi}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
                  <button
                    onClick={resetImage}
                    className="px-6 py-2 bg-sugarcane-600 text-white rounded-lg hover:bg-sugarcane-700 transition-colors"
                  >
                    {language === 'en' ? 'Analyze Another Image' : 'एक और छवि का विश्लेषण करें'}
                  </button>
                </div>
              </motion.div>
            ) : null}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle size={20} className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-500">
          <p>
            {language === 'en'
              ? 'For best results, take clear photos of the affected plant parts in good lighting. Include both healthy and affected areas for comparison.'
              : 'सर्वोत्तम परिणामों के लिए, अच्छी रोशनी में प्रभावित पौधे के हिस्सों की स्पष्ट तस्वीरें लें। तुलना के लिए स्वस्थ और प्रभावित दोनों क्षेत्रों को शामिल करें।'}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DiseasePredictor;