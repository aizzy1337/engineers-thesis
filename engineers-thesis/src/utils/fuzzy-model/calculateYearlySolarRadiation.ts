import { weatherCondition } from "../../types/weather-condition";

export function calculateYearlyGeneratedPower(
    weatherConditions: weatherCondition[]
) : number {
    return weatherConditions.reduce((acc, curr) => {
        const sunriseHour = parseInt(curr.sunrise.substring(0, 2));
        const sunsetHour = parseInt(curr.sunset.substring(0, 2));
        const daylightHours = sunsetHour - sunriseHour;
    
        if (daylightHours <= 0) return acc;
    
        const totalSolarRadiation = curr.solarradiation * 24;
        const hourlySolarRadiation = totalSolarRadiation / daylightHours;
    
        let realIrradiance = 0;
        for (let hour = sunriseHour; hour < sunsetHour; hour++) {
            const relativeHour = (hour - sunriseHour) / daylightHours;
            const sineFactor = Math.sin(Math.PI * relativeHour);
            realIrradiance += hourlySolarRadiation * sineFactor;
        }
    
        return acc + realIrradiance;
    }, 0) / 1000;
}