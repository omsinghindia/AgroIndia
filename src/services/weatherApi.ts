// weatherApi.ts
export type WeatherApiResponse = {
  address: string;
  latitude: number;
  longitude: number;
  timezone: string;
  currentConditions: {
    temp: number;
    humidity: number;
    windspeed: number;
    winddir: number;
    conditions: string;
    icon: string;
    sunrise: string;
    sunset: string;
    uvindex: number;
    visibility: number;
  };
  days: Array<{
    datetime: string;
    tempmax: number;
    tempmin: number;
    temp: number;
    conditions: string;
    description: string;
    humidity: number;
    precip: number;
    windspeed: number;
    sunrise: string;
    sunset: string;
    icon: string; // Ensure icon is included in the type
    hours: Array<{
      datetime: string;
      temp: number;
      conditions: string;
      precip: number;
      humidity: number;
      windspeed: number;
    }>;
  }>;
};

export const fetchWeatherData = async (district: string): Promise<WeatherApiResponse | null> => {
  try {
    const apiKey = 'ae8a479a0660072aa92b17e7e6f1eb1d';
    const location = `${district.trim()}, Uttar Pradesh, India`;
    const encodedLocation = encodeURIComponent(location);
    console.log('Fetching weather for encoded location:', encodedLocation); // Debug log

    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodedLocation}&limit=1&appid=${apiKey}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.length) throw new Error('Location not found');

    const { lat, lon, name } = geoData[0];

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const currentRes = await fetch(currentUrl);
    const current = await currentRes.json();

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastRes = await fetch(forecastUrl);
    const forecast = await forecastRes.json();

    const groupedByDay: { [key: string]: any[] } = {};
    for (const item of forecast.list) {
      const date = item.dt_txt.split(' ')[0];
      if (!groupedByDay[date]) groupedByDay[date] = [];
      groupedByDay[date].push(item);
    }

    const days = Object.entries(groupedByDay).map(([date, hourlyData]) => {
      const temps = hourlyData.map((h) => h.main.temp);
      const humidities = hourlyData.map((h) => h.main.humidity);
      const windspeeds = hourlyData.map((h) => h.wind.speed);
      const descriptions = hourlyData.map((h) => h.weather[0].description);
      // Use the icon from the first hour's data as a representative icon for the day
      const icon = hourlyData[0].weather[0].icon; // Add icon for the day

      return {
        datetime: date,
        tempmax: Math.max(...temps),
        tempmin: Math.min(...temps),
        temp: temps.reduce((a, b) => a + b) / temps.length,
        conditions: hourlyData[0].weather[0].main,
        description: descriptions[0],
        humidity: humidities.reduce((a, b) => a + b) / humidities.length,
        precip: hourlyData[0].pop ?? 0,
        windspeed: windspeeds.reduce((a, b) => a + b) / windspeeds.length,
        sunrise: current.sys.sunrise ? new Date(current.sys.sunrise * 1000).toLocaleTimeString() : '06:00',
        sunset: current.sys.sunset ? new Date(current.sys.sunset * 1000).toLocaleTimeString() : '18:00',
        icon, // Assign the icon
        hours: hourlyData.map((h) => ({
          datetime: h.dt_txt,
          temp: h.main.temp,
          conditions: h.weather[0].main,
          precip: h.pop ?? 0,
          humidity: h.main.humidity,
          windspeed: h.wind.speed,
        })),
      };
    });

    return {
      address: `${name}, Uttar Pradesh, India`,
      latitude: lat,
      longitude: lon,
      timezone: forecast.city.timezone?.toString() ?? 'Asia/Kolkata',
      currentConditions: {
        temp: current.main.temp,
        humidity: current.main.humidity,
        windspeed: current.wind.speed,
        winddir: current.wind.deg,
        conditions: current.weather[0].main,
        icon: current.weather[0].icon,
        sunrise: new Date(current.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(current.sys.sunset * 1000).toLocaleTimeString(),
        uvindex: 0,
        visibility: current.visibility / 1000,
      },
      days,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};