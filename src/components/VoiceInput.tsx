
import { useState, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

type VoiceInputProps = {
  language: 'en' | 'hi';
  onResult: (text: string) => void;
};

const VoiceInput = ({ language, onResult }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Simulated voice recognition
  const startListening = () => {
    setIsListening(true);
    setError(null);
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      
      // Simulate voice recognition result
      const mockResults = {
        'en': 'My soil type is loamy and I have 5 acres of land in Lucknow district',
        'hi': 'मेरी मिट्टी का प्रकार दोमट है और मेरे पास लखनऊ जिले में 5 एकड़ जमीन है'
      };
      
      onResult(mockResults[language]);
      setIsListening(false);
    }, 2000);
  };
  
  const stopListening = () => {
    setIsListening(false);
    setIsProcessing(false);
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={isListening ? stopListening : startListening}
        className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-sugarcane-600 hover:bg-sugarcane-700'
        } text-white shadow-md`}
      >
        {isProcessing ? (
          <Loader2 size={28} className="animate-spin" />
        ) : isListening ? (
          <MicOff size={28} />
        ) : (
          <Mic size={28} />
        )}
        
        {isListening && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -inset-1 rounded-full border-2 border-red-500 animate-pulse"
          />
        )}
      </motion.button>
      
      <p className="mt-2 text-sm text-center">
        {isProcessing ? (
          language === 'en' ? 'Listening...' : 'सुन रहा हूँ...'
        ) : isListening ? (
          language === 'en' ? 'Tap to stop' : 'रोकने के लिए टैप करें'
        ) : (
          language === 'en' ? 'Tap to speak' : 'बोलने के लिए टैप करें'
        )}
      </p>
      
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default VoiceInput;
