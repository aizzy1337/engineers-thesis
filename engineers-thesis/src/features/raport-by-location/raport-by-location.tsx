import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsonResponseConverter } from "../../utils/jsonResponseConverter";
import { weatherCondition } from "../../types/weather-condition";
import createPagination from "../../utils/createPagination";
import { weatherData } from "../../types/weather-data";
import Raport from "../../pages/raport/raport";
import React from "react";
import Loading from "../../pages/loading/loading";

const RaportByLocation = () => {
    const { lat, lng } = useParams();
    const [weatherConditions, setWeatherConditions] = useState<weatherCondition[]>([]);
    const [weatherData, setWeatherData] = useState<weatherData>();
    const [isSet, setIsSet] = useState<boolean>(false);

    useEffect(() => {
        const getWeatherConditions = async () => {
            const datePagination = createPagination();

            datePagination.forEach(async (dateRange) => {
                const responseJson = await fetch(`/weather/${lat}/${lng}/${dateRange.start}/${dateRange.end}`);
                const response = await jsonResponseConverter(responseJson);
                setWeatherConditions([...weatherConditions, ...response])
            });

            setWeatherData({
                latitude: parseFloat(lat as string),
                longitude: parseFloat(lng as string),
                weatherConditions: weatherConditions as weatherCondition[]
            });
        }
    
        getWeatherConditions();
        if(weatherConditions.length >= 365) {
            setIsSet(true);
        }
    }, [lat, lng, weatherConditions, isSet]);

    return (
        <>
            {(isSet && weatherData !== undefined) ? <Raport data={weatherData as weatherData} /> : <Loading />}
        </>
    );
}

export default RaportByLocation;