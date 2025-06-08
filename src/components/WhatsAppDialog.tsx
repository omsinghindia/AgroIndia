import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppDialogProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'hi';
}

const WhatsAppDialog = ({ isOpen, onClose, language }: WhatsAppDialogProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');



    const handleConnect = async () => {
      if (!phoneNumber || phoneNumber.length < 10) {
        alert(language === 'en' ? 'Please enter a valid phone number' : 'कृपया एक वैध फोन नंबर दर्ज करें');
        return;
      }
    
      setIsLoading(true);
      setStatus('loading');
      console.log('Sending request to /api/whatsapp-connect with phoneNumber:', phoneNumber);
    
      try {
        const response = await fetch('http://localhost:3000/api/whatsapp-connect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`,
          }),
        });
    
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);
    
        if (data.success) {
          setStatus('success');
          setTimeout(() => {
            onClose();
            setPhoneNumber('');
            setStatus('idle');
          }, 2000);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        setStatus('error');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MessageCircle className="mr-2" />
            {language === 'en' ? 'Connect to WhatsApp' : 'व्हाट्सएप से जुड़ें'}
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'en' ? 'Enter your WhatsApp number' : 'अपना व्हाट्सएप नंबर दर्ज करें'}
            </label>
            <input
              type="tel"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder={language === 'en' ? 'Enter phone number' : 'फोन नंबर दर्ज करें'}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <p className="mt-1 text-sm text-gray-500">
              {language === 'en' ? 'Format: +91XXXXXXXXXX or 10 digits' : 'प्रारूप: +91XXXXXXXXXX या 10 अंक'}
            </p>
          </div>

          <button
            onClick={handleConnect}
            disabled={isLoading}
            className={`w-full py-2 rounded-lg text-white font-medium transition-colors ${
              isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isLoading 
              ? (language === 'en' ? 'Connecting...' : 'कनेक्ट हो रहा है...') 
              : (language === 'en' ? 'Connect' : 'कनेक्ट करें')}
          </button>

          {status === 'success' && (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg">
              {language === 'en' 
                ? 'Connection successful! Check your WhatsApp.' 
                : 'कनेक्शन सफल! अपना व्हाट्सएप चेक करें।'}
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg">
              {language === 'en' 
                ? 'Connection successful! Check your WhatsApp.' 
                : 'कनेक्शन सफल! अपना व्हाट्सएप चेक करें।'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppDialog; 