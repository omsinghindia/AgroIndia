import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, CloudSun, Droplets, Wind, Thermometer, Calendar, Sun, Cloud, CloudLightning, CloudFog } from 'lucide-react';
import { fetchWeatherData, WeatherApiResponse } from '../services/weatherApi';
import FarmingGuidelines from './FarmingGuidelines';

type WeatherDisplayProps = {
  language: 'en' | 'hi';
  district: string;
  predictedYield?: number;
};

type WeatherData = {
  date: string;
  condition: 'sunny' | 'cloudy' | 'rainy';
  tempMax: number;
  tempMin: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  icon: string;
};

const WeatherDisplay = ({ language, district, predictedYield }: WeatherDisplayProps) => {
  console.log('WeatherDisplay language:', language);

  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState<{
    temp: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    sunrise: string;
    sunset: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getSeason = (): 'summer' | 'monsoon' | 'winter' => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'summer';
    if (month >= 6 && month <= 9) return 'monsoon';
    return 'winter';
  };

  const season = getSeason();

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const cleanedDistrict = district.trim();
        console.log('WeatherDisplay fetching for district:', cleanedDistrict);

        if (!cleanedDistrict) {
          throw new Error('No district provided');
        }

        const data = await fetchWeatherData(cleanedDistrict);
        if (data) {
          setCurrentWeather({
            temp: data.currentConditions.temp,
            condition: data.currentConditions.conditions,
            icon: data.currentConditions.icon,
            humidity: data.currentConditions.humidity,
            windSpeed: data.currentConditions.windspeed,
            sunrise: data.currentConditions.sunrise,
            sunset: data.currentConditions.sunset,
          });

          const parsedData = data.days.map((day) => ({
            date: day.datetime,
            condition: getConditionType(day.conditions),
            tempMax: day.tempmax,
            tempMin: day.tempmin,
            humidity: day.humidity,
            rainfall: day.precip,
            windSpeed: day.windspeed,
            icon: day.icon,
          }));

          setWeatherData(parsedData);
        } else {
          throw new Error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(error.message || 'An error occurred while fetching weather data');
      } finally {
        setLoading(false);
      }
    };

    if (district) {
      fetchWeather();
    } else {
      setLoading(false);
      setError('No district provided');
    }
  }, [district]);

  const getConditionType = (condition: string): 'sunny' | 'cloudy' | 'rainy' => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle') || lowerCondition.includes('shower')) return 'rainy';
    if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast') || lowerCondition.includes('fog')) return 'cloudy';
    if (lowerCondition.includes('clear') || lowerCondition.includes('sun')) return 'sunny';
    console.warn('Unknown condition, defaulting to sunny:', condition);
    return 'sunny'; // Default fallback
  };

  const getWeatherIcon = (condition: string) => {
    const conditionType = getConditionType(condition);
    
    const iconUrls = {
      sunny: 'https://cdn-icons-png.flaticon.com/512/3222/3222675.png',
      cloudy: 'https://cdn-icons-png.flaticon.com/512/414/414825.png',
      rainy: 'https://cdn-icons-png.flaticon.com/512/4150/4150904.png'
    };

    return (
      <img
        src={iconUrls[conditionType]}
        alt={conditionType}
        className="w-12 h-12"
      />
    );
  };

  const getWeatherLabel = (condition: string) => {
    if (language === 'en') {
      switch (condition) {
        case 'sunny': return 'Sunny';
        case 'cloudy': return 'Cloudy';
        case 'rainy': return 'Rainy';
        default: return condition;
      }
    } else {
      switch (condition) {
        case 'sunny': return 'धूप';
        case 'cloudy': return 'बादल';
        case 'rainy': return 'बारिश';
        default: return condition;
      }
    }
  };

  const averageRainfall = weatherData.length
    ? weatherData.reduce((sum, day) => sum + day.rainfall, 0) / weatherData.length
    : 0;

  const currentCondition = currentWeather?.condition ? getConditionType(currentWeather.condition) : 'sunny';

  return (
    <div id="weather" className="w-full">
      <motion.div
        className="neo-card p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-gray-800">
            {language === 'en' ? 'Weather Forecast' : 'मौसम का पूर्वानुमान'}
          </h2>
          {district && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="hidden md:inline mr-2">
                {language === 'en' ? 'Location:' : 'स्थान:'}
              </span>
              <span className="font-medium text-gray-700">{district}</span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="h-48 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{language === 'en' ? error : 'त्रुटि: मौसम डेटा लोड नहीं हुआ'}</div>
        ) : (
          <>
            {currentWeather && (
              <div className="mb-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-white rounded-full shadow-soft mr-4">
                      {getWeatherIcon(currentWeather.condition)}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600">
                        {language === 'en' ? 'Current Weather' : 'वर्तमान मौसम'}
                      </h3>
                      <p className="text-2xl font-semibold text-blue-700">
                        {Math.round(currentWeather.temp)}°C
                        <span className="ml-2 text-base font-normal text-blue-600">
                          {getWeatherLabel(currentWeather.condition)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center">
                      <Droplets size={16} className="mr-1 text-blue-500" />
                      <span>{currentWeather.humidity}%</span>
                    </div>
                    <div className="flex items-center">
                      <Wind size={16} className="mr-1 text-green-500" />
                      <span>{currentWeather.windSpeed.toFixed(1)} km/h</span>
                    </div>
                    <div className="flex items-center">
                      <Sun size={16} className="mr-1 text-yellow-500" />
                      <span>
                        {currentWeather.sunrise} - {currentWeather.sunset}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-8 bg-sky-50 rounded-lg p-4 border border-sky-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="p-3 bg-white rounded-full shadow-soft mr-4">
                    <Droplets size={24} className="text-sky-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">
                      {language === 'en' ? 'Average Rainfall' : 'औसत वर्षा'}
                    </h3>
                    <p className="text-2xl font-semibold text-sky-700">
                      {averageRainfall.toFixed(1)} <span className="text-sm font-normal text-sky-600">mm</span>
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'en'
                    ? 'Based on the 5-day forecast. This data helps estimate irrigation needs for your crops.'
                    : '5-दिवसीय पूर्वानुमान के आधार पर। यह डेटा आपकी फसलों के लिए सिंचाई की जरूरतों का अनुमान लगाने में मदद करता है।'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {weatherData.map((day, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-soft border border-gray-100 flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar size={14} className="mr-1" />
                    <span>{new Date(day.date).toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}</span>
                  </div>

                  <div className="my-2">{getWeatherIcon(day.condition)}</div>

                  <div className="text-center mb-3">
                    <span className="text-sm font-medium">{getWeatherLabel(day.condition)}</span>
                  </div>

                  <div className="flex items-center justify-between w-full text-sm mb-2">
                    <div className="flex items-center">
                      <Thermometer size={14} className="mr-1 text-red-500" />
                      <span>{Math.round(day.tempMax)}°C</span>
                    </div>
                    <div className="flex items-center">
                      <Thermometer size={14} className="mr-1 text-blue-400" />
                      <span>{Math.round(day.tempMin)}°C</span>
                    </div>
                  </div>

                  <div className="text-sm text-blue-600 flex items-center mb-1">
                    <Droplets size={14} className="mr-1" />
                    <span>{day.rainfall.toFixed(1)} mm</span>
                  </div>

                  <div className="text-sm text-green-600 flex items-center">
                    <Wind size={14} className="mr-1" />
                    <span>
                      {day.windSpeed.toFixed(1)} {language === 'en' ? 'km/h' : 'कि.मी/घंटा'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Farming Guidelines Section */}
            {currentWeather && (
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FarmingGuidelines
                  weather={currentCondition}
                  season={season}
                  language={language}
                  predictedYield={predictedYield}
                />
              </motion.div>
            )}

            <div className="mt-6 text-sm text-gray-500">
              <p>
                {language === 'en'
                  ? 'Historical data shows that weather patterns significantly impact sugarcane yield in Uttar Pradesh.'
                  : 'ऐतिहासिक डेटा दिखाता है कि मौसम के पैटर्न उत्तर प्रदेश में गन्ने की उपज को महत्वपूर्ण रूप से प्रभावित करते हैं।'}
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default WeatherDisplay;