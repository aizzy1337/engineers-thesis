import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../pages/loading/loading";
import ErrorComponent from "../../pages/error/error";
import Raport from "../../pages/raport/raport";
import { weatherData } from "../../types/weather-data";

const RaportByCode = () => {
    const { code } = useParams();

    const [weatherData, setWeatherData] = useState<weatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/raport/${code}`, {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch data`);
                }
                const result = await response.json() as weatherData;
                setWeatherData(result);
            } catch (error) {
                setError(`Error fetching weather data: ${(error as Error).message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [code]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorComponent />;
    }

    return weatherData ? <Raport data={weatherData} /> : <ErrorComponent />;
}

export default RaportByCode;