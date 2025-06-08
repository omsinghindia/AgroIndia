import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import WhatsAppDialog from './WhatsAppDialog';

type FooterProps = {
  language: 'en' | 'hi';
};

const Footer = ({ language }: FooterProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <footer id="contact" className="w-full bg-sugarcane-800 text-white py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-medium border-b border-sugarcane-700 pb-2 mb-4">
              {language === 'en' ? 'About Us' : 'हमारे बारे में'}
            </h3>
            <p className="text-sugarcane-100 text-sm">
              {language === 'en' 
                ? 'We are dedicated to help farmers in Uttar Pradesh improve their yields through technology and data-driven insights.' 
                : 'हम उत्तर प्रदेश के किसानों को प्रौद्योगिकी और डेटा-संचालित अंतर्दृष्टि के माध्यम से अपनी उपज में सुधार करने में मदद करने के लिए समर्पित हैं।'}
            </p>
            
            <div className="pt-4">
              <button 
                onClick={() => setIsDialogOpen(true)}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 transition-colors px-4 py-2 rounded-lg text-white"
              >
                <MessageCircle size={20} />
                <span>
                  {language === 'en' ? 'Connect on WhatsApp' : 'व्हाट्सएप पर जुड़ें'}
                </span>
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-medium border-b border-sugarcane-700 pb-2 mb-4">
              {language === 'en' ? 'Quick Links' : 'त्वरित लिंक'}
            </h3>
            <nav className="space-y-2">
              <a href="#predict" className="flex items-center text-sugarcane-100 hover:text-white transition-colors">
                <ChevronRight size={16} className="mr-2 text-sugarcane-400" />
                <span>
                  {language === 'en' ? 'Yield Prediction' : 'उपज भविष्यवाणी'}
                </span>
              </a>
              <a href="#disease" className="flex items-center text-sugarcane-100 hover:text-white transition-colors">
                <ChevronRight size={16} className="mr-2 text-sugarcane-400" />
                <span>
                  {language === 'en' ? 'Disease Detection' : 'रोग पहचान'}
                </span>
              </a>
              <a href="#weather" className="flex items-center text-sugarcane-100 hover:text-white transition-colors">
                <ChevronRight size={16} className="mr-2 text-sugarcane-400" />
                <span>
                  {language === 'en' ? 'Weather Forecast' : 'मौसम पूर्वानुमान'}
                </span>
              </a>
              <a href="#" className="flex items-center text-sugarcane-100 hover:text-white transition-colors">
                <ChevronRight size={16} className="mr-2 text-sugarcane-400" />
                <span>
                  {language === 'en' ? 'Farming Tips' : 'खेती के टिप्स'}
                </span>
              </a>

            </nav>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-medium border-b border-sugarcane-700 pb-2 mb-4">
              {language === 'en' ? 'Contact Us' : 'संपर्क करें'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start text-sugarcane-100">
                <MapPin size={18} className="mr-3 mt-1 flex-shrink-0 text-sugarcane-400" />
                <span>
                  {language === 'en' 
                    ? 'Babu Banarasi Das Engineering College, Lucknow, Uttar Pradesh, India' 
                    : 'कृषि विभाग, लखनऊ, उत्तर प्रदेश, भारत'}
                </span>
              </div>
              <div className="flex items-center text-sugarcane-100">
                <Phone size={18} className="mr-3 flex-shrink-0 text-sugarcane-400" />
                <span>+91 XXX XXX XXXX</span>
              </div>
              <div className="flex items-center text-sugarcane-100">
                <Mail size={18} className="mr-3 flex-shrink-0 text-sugarcane-400" />
                <span>support@AgroIndia.org</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-sugarcane-700 text-center text-sugarcane-200 text-sm">
          <p>
            {language === 'en' 
              ? '© 2025 AgroIndia - Uttar Pradesh. All rights reserved.' 
              : '© 2025 अग्रोइंडिया s - उत्तर प्रदेश। सर्वाधिकार सुरक्षित।'}
          </p>
        </div>
      </div>

      <WhatsAppDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        language={language}
      />
    </footer>
  );
};

export default Footer;
