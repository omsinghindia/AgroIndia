import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mic, MicOff, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AskDoubtProps = {
  language: 'en' | 'hi';
};

const AskDoubt = ({ language }: AskDoubtProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  // Initialize and update SpeechRecognition when language changes
// AskDoubt.tsx (partial excerpt for reference)
useEffect(() => {
  console.log('AskDoubt language changed to:', language); // Debug log
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = language === 'en' ? 'en-US' : 'hi-IN';

    recognitionInstance.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
      setIsRecording(false);
    };

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognition && recognitionInstance !== recognition) recognition.stop();
    };
  } else {
    console.warn('Speech Recognition API not supported in this browser.');
  }
}, [language]); // Re-run when language changes

  const toggleRecording = () => {
    if (isRecording) {
      if (recognition) recognition.stop();
    } else {
      if (recognition) {
        recognition.start();
        setIsRecording(true);
        console.log('Started recording...');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);

    setTimeout(() => {
      let response = '';
      const lowerQuestion = question.toLowerCase();

      if (lowerQuestion.includes('disease')) {
        response = language === 'en'
          ? 'Common diseases in Uttar Pradesh include:\n- Red Rot (Colletotrichum falcatum): Identified by reddish discoloration in the cane. Remove affected plants and use resistant varieties.\n- Smut (Ustilago scitaminea) : Causes black whip-like structures. Use disease-free setts and fungicides.\n-  Leaf Scald (Xanthomonas albilineans) : Shows white streaks on leaves. Ensure proper drainage and avoid water stress.\nEarly detection and crop rotation are key.'
          : 'उत्तर प्रदेश में सामान्य रोग:\n-  लाल सड़ांध (Colletotrichum falcatum) : गन्ने में लाल रंग का प्रदर्शन होता है। प्रभावित पौधों को हटाएं और प्रतिरोधी किस्मों का उपयोग करें।\n-  कंडुआ (Ustilago scitaminea) : काले चाबुक जैसे ढांचे बनाता है। रोग-मुक्त सेट्स और कवकनाशी का उपयोग करें।\n-  पत्ता झुलसा (Xanthomonas albilineans) : पत्तियों पर सफेद धारियां दिखाई देती हैं। उचित जल निकासी सुनिश्चित करें और पानी की कमी से बचें।\nजल्दी पता लगाना और फसल चक्रण महत्वपूर्ण हैं।';
      } else if (lowerQuestion.includes('water') || lowerQuestion.includes('irrigation')) {
        response = language === 'en'
          ? ' irrigation in Uttar Pradesh:\n- Requires 1500-2500 mm water annually.\n- Irrigate every 10-15 days in summer, reduce during monsoon (June-September), and adjust in winter based on rainfall.\n- Use drip irrigation for efficiency and avoid waterlogging.\nBest practice: Monitor soil moisture and apply water during early morning or late evening.'
          : 'उत्तर प्रदेश में सिंचाई:\n- सालाना 1500-2500 मिमी पानी की आवश्यकता होती है।\n- गर्मी में हर 10-15 दिनों में सिंचाई करें, मानसून (जून-सितंबर) के दौरान कम करें, और सर्दियों में वर्षा के आधार पर समायोजित करें।\n- दक्षता के लिए ड्रिप सिंचाई का उपयोग करें और जलभराव से बचें।\nसर्वोत्तम अभ्यास: मिट्टी की नमी की निगरानी करें और सुबह या शाम के समय पानी दें।';
      } else if (lowerQuestion.includes('fertilizer')) {
        response = language === 'en'
          ? 'Fertilizer management for in Uttar Pradesh:\n- Use NPK (120:60:60 kg/ha) in split doses.\n- Apply 1/3 at planting, 1/3 after 45-60 days, and 1/3 after 90-120 days.\n- Add organic manure (20-25 tons/ha) at planting.\n- Best practice: Conduct soil tests and avoid excess nitrogen to prevent pest issues.'
          : 'उत्तर प्रदेश में उर्वरक प्रबंधन:\n- NPK (120:60:60 किग्रा/हेक्टेयर) का उपयोग विभाजित खुराक में करें।\n- रोपण के समय 1/3, 45-60 दिनों के बाद 1/3, और 90-120 दिनों के बाद 1/3 लागू करें।\n- रोपण के समय जैविक खाद (20-25 टन/हेक्टेयर) डालें।\nसर्वोत्तम अभ्यास: मिट्टी की जांच करें और अत्यधिक नाइट्रोजन से बचें ताकि कीट समस्याओं से बचा जा सके।';
      } else if (lowerQuestion.includes('technique') || lowerQuestion.includes('farming')) {
        response = language === 'en'
          ? 'Sugarcane farming techniques in Uttar Pradesh:\n-  Planting : Use setts with 3-4 buds, plant in February-March for early variety or October-November for mid-late variety.\n-  Spacing : Maintain 90-120 cm row spacing.\n-  Weeding : Control weeds with 2-3 hoeings or herbicides.\n-  Harvesting : Cut at 12-18 months, preferably in February-March.'
          : 'उत्तर प्रदेश में गन्ना खेती की तकनीकें:\n-  रोपण : 3-4 कली वाले सेट्स का उपयोग करें, फरवरी-मार्च में प्रारंभिक किस्म या अक्टूबर-नवंबर में मध्य-देर से किस्म के लिए लगाएं।\n-  दूरी : 90-120 सेमी पंक्ति दूरी बनाए रखें।\n-  खरपतवार नियंत्रण : 2-3 जुताई या हर्बिसाइड्स से खरपतवार नियंत्रित करें।\n-  कटाई : 12-18 महीनों में काटें, अधिमानतः फरवरी-मार्च में।';
      } else if (lowerQuestion.includes('best practice')) {
        response = language === 'en'
          ? 'Best practices for sugarcane in Uttar Pradesh:\n- Rotate with leguminous crops to improve soil fertility.\n- Use integrated pest management to reduce chemical use.\n- Ensure timely irrigation and drainage.\n- Harvest at optimal maturity for higher sugar content.'
          : 'उत्तर प्रदेश में गन्ने के लिए सर्वोत्तम अभ्यास:\n- मिट्टी की उर्वरता बढ़ाने के लिए दलहनी फसलों के साथ चक्रण करें।\n- रासायनिक उपयोग को कम करने के लिए एकीकृत कीट प्रबंधन का उपयोग करें।\n- समय पर सिंचाई और जल निकासी सुनिश्चित करें।\n- अधिक चीनी सामग्री के लिए इष्टतम परिपक्वता पर कटाई करें।';
      } else {
        response = language === 'en'
          ? 'Thank you for your question! Please ask about specific topics like diseases, irrigation, fertilizers, farming techniques, or best practices for detailed answers.'
          : 'आपके प्रश्न के लिए धन्यवाद! कृपया रोग, सिंचाई, उर्वरक, खेती की तकनीक, या सर्वोत्तम अभ्यास जैसे विशिष्ट विषयों के बारे में पूछें ताकि विस्तृत उत्तर प्राप्त हो सकें।';
      }

      setAnswer(response);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-sugarcane-600 hover:bg-sugarcane-700 text-white"
        >
          <MessageCircle className="mr-2" />
          {language === 'en' ? 'Ask a Doubt' : 'संदेह पूछें'}
        </Button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            {language === 'en' ? 'Ask about Farming in UP' : 'उत्तर प्रदेश में गन्ना खेती के बारे में पूछें'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-3">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sugarcane-500 focus:border-transparent resize-none"
                placeholder={language === 'en' ? 'Type your question here...' : 'अपना प्रश्न यहां टाइप करें...'}
                rows={3}
              />
              <Button
                type="button"
                onClick={toggleRecording}
                variant="outline"
                className={`${
                  isRecording ? 'bg-red-100 border-red-300 text-red-700' : 'border-gray-300 text-gray-700'
                } hover:bg-gray-100`}
                disabled={!recognition}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Button
                type="submit"
                disabled={loading || !question.trim()}
                className="bg-sugarcane-600 hover:bg-sugarcane-700 text-white disabled:bg-gray-400"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
          </form>

          {answer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200"
            >
              <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
            </motion.div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            {language === 'en'
              ? 'Ask questions about  farming, diseases, irrigation, fertilizers, techniques, or best practices specific to Uttar Pradesh.'
              : 'उत्तर प्रदेश क्षेत्र के लिए विशिष्ट गन्ना खेती, रोग, सिंचाई, उर्वरक, तकनीक, या सर्वोत्तम अभ्यास के बारे में प्रश्न पूछें।'}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AskDoubt;