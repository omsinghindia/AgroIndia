// Header.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';

const Header = ({ 
  language, 
  setLanguage 
}: { 
  language: 'en' | 'hi', 
  setLanguage: (lang: 'en' | 'hi') => void 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="w-full py-4 px-6 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-10 w-10 mr-3 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
            <img src="/sugar-cane-svgrepo-com (1).svg" className="w-8 h-8 p-1" />
          </div>
          <h1 className="text-xl font-medium tracking-tight hidden md:block">
            {language === 'en' ? 'AgroIndia' : 'अग्रोइंडिया '}
          </h1>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => {
              const newLang = language === 'en' ? 'hi' : 'en';
              console.log('Toggling to language:', newLang); // Debug log
              setLanguage(newLang);
            }}
            className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-sugarcane-700 transition-all"
          >
            <Globe size={18} />
            <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
          </button>
          
          <motion.nav 
            className="flex space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, staggerChildren: 0.1 }}
          >
            <a href="#predict" className="text-sm font-medium text-gray-600 hover:text-sugarcane-700">
              {language === 'en' ? 'Predict' : 'भविष्यवाणी करें'}
            </a>
            <a href="#disease" className="text-sm font-medium text-gray-600 hover:text-sugarcane-700">
              {language === 'en' ? 'Disease Detection' : 'रोग का पता लगाना'}
            </a>
            <a href="#weather" className="text-sm font-medium text-gray-600 hover:text-sugarcane-700">
              {language === 'en' ? 'Weather' : 'मौसम'}
            </a>
            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-sugarcane-700">
              {language === 'en' ? 'Contact' : 'संपर्क करें'}
            </a>
          </motion.nav>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-600 hover:text-sugarcane-700 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden absolute top-[72px] left-0 right-0 bg-white shadow-md py-4 px-6 z-40"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-4">
            <a 
              href="#predict" 
              className="text-gray-600 hover:text-sugarcane-700 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {language === 'en' ? 'Predict' : 'भविष्यवाणी करें'}
            </a>
            <a 
              href="#disease" 
              className="text-gray-600 hover:text-sugarcane-700 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {language === 'en' ? 'Disease Detection' : 'रोग का पता लगाना'}
            </a>
            <a 
              href="#weather" 
              className="text-gray-600 hover:text-sugarcane-700 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {language === 'en' ? 'Weather' : 'मौसम'}
            </a>
            <a 
              href="#contact" 
              className="text-gray-600 hover:text-sugarcane-700 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {language === 'en' ? 'Contact' : 'संपर्क करें'}
            </a>
            <button 
              onClick={() => {
                const newLang = language === 'en' ? 'hi' : 'en';
                console.log('Toggling to language (mobile):', newLang); // Debug log
                setLanguage(newLang);
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-sugarcane-700 py-2"
            >
              <Globe size={18} />
              <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;