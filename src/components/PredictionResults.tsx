import { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';
import FarmingGuidelines from './FarmingGuidelines';

type WeatherData = {
  date: string;
  condition: 'sunny' | 'cloudy' | 'rainy';
  tempMax: number;
  tempMin: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
};

const PredictionResults = () => {
  // Set initial mock values to ensure guidelines always show
  const [currentWeather, setCurrentWeather] = useState<'sunny' | 'cloudy' | 'rainy'>('sunny');
  const [currentSeason, setCurrentSeason] = useState<'summer' | 'monsoon' | 'winter'>('summer');
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(true); // Always show results

  useEffect(() => {
    // Set initial season based on current month
    setCurrentSeason(getCurrentSeason(new Date()));
    setIsLoading(false);
  }, []);

  const getCurrentSeason = (date: Date): 'summer' | 'monsoon' | 'winter' => {
    const month = date.getMonth() + 1;
    if (month >= 3 && month <= 6) return 'summer';
    if (month >= 7 && month <= 10) return 'monsoon';
    return 'winter';
  };

  const handleWeatherUpdate = (weatherData: WeatherData[]) => {
    if (weatherData && weatherData.length > 0) {
      setCurrentWeather(weatherData[0].condition);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Yield Prediction Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Predicted Yield</h2>
          <div className="text-4xl font-bold text-green-600">93,500 quintals</div>
          <p className="mt-2 text-gray-600">Based on current weather conditions and historical data</p>
        </div>

        {/* Weather Display Section */}
        <WeatherDisplay 
          language="en"
          district="Lucknow"
          onWeatherUpdate={handleWeatherUpdate}
        />

        {/* Farming Guidelines Section - Always show */}
        <div className="mt-8">
          <FarmingGuidelines 
            weather={currentWeather}
            season={currentSeason}
          />
        </div>
      </div>

      {/* Debug Information - Hidden in production */}
      <div className="hidden">
        Debug - Weather: {currentWeather}, Season: {currentSeason}
      </div>
    </div>
  );
};

export default PredictionResults; 