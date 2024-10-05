import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsonResponseConverter } from "../../utils/jsonResponseConverter";
import { weatherCondition } from "../../types/weather-condition";
import createPagination from "../../utils/createPagination";
import { weatherData } from "../../types/weather-data";
import Raport from "../../pages/raport/raport";
import React from "react";

function RaportByLocation() {
    const { lat, lng } = useParams();
    const [weatherConditions, setWeatherConditions] = useState<weatherCondition[]>([]);
    const [weatherData, setWeatherData] = useState<weatherData>();

    useEffect(() => {
        const getWeatherConditions = async () => {
            const datePagination = createPagination();

            datePagination.forEach(async (dateRange) => {
                const responseJson = await fetch(`/weather/${lat}/${lng}/${dateRange.start}/${dateRange.end}`);
                const response = await jsonResponseConverter(responseJson);
                setWeatherConditions([...weatherConditions, ...response])
                console.log(response);
            });

            setWeatherData({
                latitude: parseFloat(lat as string),
                longitude: parseFloat(lng as string),
                weatherConditions: weatherConditions
            });
        }
    
        getWeatherConditions();
    }, []);

    return (
        <>
            <Raport data={weatherData as weatherData} />
        </>
    );
}

export default RaportByLocation;