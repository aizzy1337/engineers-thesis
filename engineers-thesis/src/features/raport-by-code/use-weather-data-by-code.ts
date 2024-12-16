import { useState, useEffect } from 'react';
import { weatherData } from "../../types/weather-data";

export const useWeatherDataByCode = (code: string | undefined) => {
  const [weatherData, setWeatherData] = useState<weatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) {
      setError('Code is missing');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/raport/${code}`, {
          method: 'GET',
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = (await response.json()) as weatherData;
        setWeatherData(result);
      } catch (error) {
        setError(`Error fetching weather data: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code]);

  return { weatherData, loading, error };
};
