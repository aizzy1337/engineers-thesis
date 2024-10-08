import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsonResponseConverter } from "../../utils/jsonResponseConverter";
import { weatherCondition } from "../../types/weather-condition";
import { weatherData } from "../../types/weather-data";
import Raport from "../../pages/raport/raport";
import React from "react";
import Loading from "../../pages/loading/loading";
import ErrorComponent from "../../pages/error/error";
import createPagination from "../../utils/createPagination";

const RaportByLocation = () => {
    const { lat, lng } = useParams();
    const [weatherData, setWeatherData] = useState<weatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherConditions = async () => {
            try {
                const weatherConditions: weatherCondition[] = [];
                const datePagination = createPagination();

                const weatherPromises = datePagination.map(async (dateRange) => {
                    const response = await fetch(`/weather/${lat}/${lng}/${dateRange.start}/${dateRange.end}`, {
                        headers: {
                            'x-api-key': import.meta.env.VITE_API_KEY
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to fetch weather data for range: ${dateRange.start} - ${dateRange.end}`);
                    }
                    return await jsonResponseConverter(response)
                });

                const results = await Promise.all(weatherPromises);
                results.forEach((result) => {
                    weatherConditions.push(...result);
                });

                setWeatherData({
                    latitude: parseFloat(lat as string),
                    longitude: parseFloat(lng as string),
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

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorComponent />;
    }

    return weatherData ? <Raport data={weatherData} /> : <ErrorComponent />;
};

export default RaportByLocation;