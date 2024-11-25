import { solarPanelProperties } from "../../types/solar-panel-properties";
import { weatherCondition } from "../../types/weather-condition";

export function calculateGeneratedPower(
    weatherCondition: weatherCondition,
    solarPanelProperties: solarPanelProperties,
    temperatureFactor: number[],
    angleEffect: number[]
): number {
    let generatedPower: number = 0;

    const sunriseHour = parseInt(weatherCondition.sunrise.substring(0, 2), 10);
    const sunsetHour = parseInt(weatherCondition.sunset.substring(0, 2), 10);
    const peakSolarRadiation: number = weatherCondition.solarradiation * 2;

    for (let hour = 0; hour < 24; hour++) {
        const irradiance: number = (hour < sunriseHour || hour > sunsetHour) 
            ? 0 
            : peakSolarRadiation * Math.sin(Math.PI * (hour - sunriseHour) / (sunsetHour - sunriseHour));

        generatedPower +=
            solarPanelProperties.area *
            irradiance *
            solarPanelProperties.n_STC *
            temperatureFactor[hour] *
            angleEffect[hour];
    }

    return generatedPower;
}