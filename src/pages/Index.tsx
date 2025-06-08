// Index.tsx
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import PredictionForm from '../components/PredictionForm';
import DiseasePredictor from '../components/DiseasePredictor';
import WeatherDisplay from '../components/WeatherDisplay';
import Footer from '../components/Footer';
import AskDoubt from '../components/AskDoubt';
import { getTranslation } from '../utils/translationUtils';
import WhatsAppDialog from '../components/WhatsAppDialog'; // Import the new component

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  console.log('Index language:', language); // Debug log
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null);
  const [showWeather, setShowWeather] = useState(false);
  const [predictedYield, setPredictedYield] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog

  const handlePredictionFormSubmit = (district: string) => {
    console.log('Received district from form:', district);
    setActiveDistrict(district);
    setShowWeather(true);
  };

  const handlePredictionUpdate = (yieldValue: number) => {
    setPredictedYield(yieldValue);
  };

  // Force re-render check with useCallback
  const forceUpdate = useCallback(() => {
    console.log('Force update triggered with language:', language);
  }, [language]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} setLanguage={setLanguage} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sugarcane-800/90 to-sugarcane-700/80 z-10"></div>
          <div 
            className="absolute inset-0 bg-[url('/images/pexels-kailashkumarphotography-693776.jpg')] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/pexels-kailashkumarphotography-693776.jpg')" }}
          ></div>
          
          <div className="container mx-auto px-6 h-full flex items-center relative z-20">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {getTranslation('title', language)}
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-lg">
                  {getTranslation('subtitle', language)}
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <motion.a
                    href="#predict"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-sugarcane-800 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium text-center"
                  >
                    {getTranslation('getStarted', language)}
                  </motion.a>
                  <motion.a
                    onClick={() => setIsDialogOpen(true)} // Trigger WhatsApp dialog
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium text-center cursor-pointer"
                  >
                    {getTranslation('connectWhatsApp', language)}
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {getTranslation('featuresSectionTitle', language)}
              </h2>
              <div className="w-24 h-1 bg-sugarcane-500 mx-auto"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-soft border border-gray-100 hover-float"
              >
                <div className="w-16 h-16 bg-sugarcane-100 rounded-lg mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sugarcane-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  {getTranslation('feature1Title', language)}
                </h3>
                <p className="text-gray-600">
                  {getTranslation('feature1Desc', language)}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-soft border border-gray-100 hover-float"
              >
                <div className="w-16 h-16 bg-sugarcane-100 rounded-lg mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sugarcane-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  {getTranslation('feature2Title', language)}
                </h3>
                <p className="text-gray-600">
                  {getTranslation('feature2Desc', language)}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-soft border border-gray-100 hover-float"
              >
                <div className="w-16 h-16 bg-sugarcane-100 rounded-lg mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sugarcane-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  {getTranslation('feature3Title', language)}
                </h3>
                <p className="text-gray-600">
                  {getTranslation('feature3Desc', language)}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-soft border border-gray-100 hover-float"
              >
                <div className="w-16 h-16 bg-sugarcane-100 rounded-lg mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sugarcane-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  {getTranslation('feature4Title', language)}
                </h3>
                <p className="text-gray-600">
                  {getTranslation('feature4Desc', language)}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Main Content Sections */}
        <section className="py-16">
          <div className="container mx-auto px-6 space-y-16">
            <AskDoubt language={language} />
            
            <PredictionForm
              language={language}
              onFormSubmit={handlePredictionFormSubmit}
              onPredictionUpdate={handlePredictionUpdate}
            />
            
            {showWeather && activeDistrict && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <WeatherDisplay language={language} district={activeDistrict} predictedYield={predictedYield} />
              </motion.div>
            )}
            
            <DiseasePredictor language={language} />
          </div>
        </section>
      </main>
      
      <Footer language={language} />
      <WhatsAppDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} language={language} /> {/* Add the dialog */}
    </div>
  );
};

export default Index;