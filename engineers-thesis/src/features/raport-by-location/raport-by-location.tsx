import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsonResponseConverter } from "../../utils/jsonResponseConverter";
import { weatherCondition } from "../../types/weather-condition";
import { weatherData } from "../../types/weather-data";
import Raport from "../../pages/raport/raport";
import React from "react";
import Loading from "../../pages/loading/loading";

const RaportByLocation = () => {
    const { lat, lng } = useParams();
    const [weatherData, setWeatherData] = useState<weatherData>();
    const [isSet, setIsSet] = useState<boolean>(false);

    useEffect(() => {
        const getWeatherConditions = async () => {
            //const datePagination = createPagination();

            //const weatherConditions: weatherCondition[] = [];
            //datePagination.forEach(async (dateRange) => {
            //    const responseJson = await fetch(`/weather/${lat}/${lng}/${dateRange.start}/${dateRange.end}`);
            //    const response = await jsonResponseConverter(responseJson);
            //    weatherConditions.push(...response);
            //    console.log(response);
            //    console.log(weatherConditions);
            //});

            const now = new Date();
            const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), 1);
            const responseJson = await fetch(`/weather/${lat}/${lng}/${lastYear.toISOString().split('T')[0]}/${now.toISOString().split('T')[0]}`);
            const response = await jsonResponseConverter(responseJson);

            setWeatherData({
                latitude: parseFloat(lat as string),
                longitude: parseFloat(lng as string),
                weatherConditions: response as weatherCondition[]
            });
        }
    
        getWeatherConditions();
        if(weatherData !== undefined) {
            console.log(weatherData);
            setIsSet(true);
        }
    }, [lat, lng, isSet, weatherData]);

    return (
        <>
            {(isSet) ? <Raport data={weatherData as weatherData} /> : <Loading />}
        </>
    );
}

export default RaportByLocation;