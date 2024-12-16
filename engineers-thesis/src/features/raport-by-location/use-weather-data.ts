import { useState, useEffect } from 'react';
import { weatherData } from '../../types/weather-data';
import { weatherCondition } from '../../types/weather-condition';
import createPagination from '../../utils/createPagination';
import { jsonResponseConverter } from '../../utils/jsonResponseConverter';

export const useWeatherData = (lat: string | undefined, lng: string | undefined) => {
  const [weatherData, setWeatherData] = useState<weatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lng) {
      setError('Latitude or longitude is missing');
      setLoading(false);
      return;
    }

    const fetchWeatherConditions = async () => {
      try {
        const weatherConditions: weatherCondition[] = [];
        const datePagination = createPagination();

        const weatherPromises = datePagination.map(async (dateRange) => {
          const response = await fetch(`/weather/${lat}/${lng}/${dateRange.start}/${dateRange.end}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch weather data for range: ${dateRange.start} - ${dateRange.end}`);
          }
          return await jsonResponseConverter(response);
        });

        const results = await Promise.all(weatherPromises);
        results.forEach((result) => {
          weatherConditions.push(...result);
        });

        setWeatherData({
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          weatherConditions: weatherConditions,
        });
      } catch (error) {
        setError(`Error fetching weather data: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherConditions();
  }, [lat, lng]);

  return { weatherData, loading, error };
};
