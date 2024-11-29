import { solarPanelProperties } from "../../types/solar-panel-properties";
import { weatherCondition } from "../../types/weather-condition";

export function calculateGeneratedPower(
    weatherCondition: weatherCondition,
    solarPanelProperties: solarPanelProperties,
    temperatureFactor: number[],
    angleEffect: number[],
    byArea: boolean
): number {
    let generatedPower: number = 0;

    const sunriseHour = parseInt(weatherCondition.sunrise.substring(0, 2));
    const sunsetHour = parseInt(weatherCondition.sunset.substring(0, 2));
    const totalSolarRadiation: number = weatherCondition.solarradiation * 24 / (sunsetHour - sunriseHour);
    const peakSolarRadiation: number = totalSolarRadiation * (Math.PI / 2);

    for (let hour = 0; hour < 24; hour++) {
        const irradiance: number = (hour < sunriseHour || hour > sunsetHour) 
            ? 0 
            : peakSolarRadiation * Math.sin(Math.PI * (hour - sunriseHour) / (sunsetHour - sunriseHour));
           
        let generatedPowerInHour: number = 0;

        (byArea) ? 
        generatedPowerInHour = solarPanelProperties.area *
            irradiance *
            solarPanelProperties.n_STC *
            temperatureFactor[hour] *
            angleEffect[hour] *
            (1 - solarPanelProperties.systemLoss) :
        generatedPowerInHour = solarPanelProperties.P_MAX *
            irradiance / 1000 *
            temperatureFactor[hour] *
            angleEffect[hour] *
            (1 - solarPanelProperties.systemLoss)

        generatedPower += Math.max(0, Math.min(generatedPowerInHour, solarPanelProperties.P_MAX));
    }

    return generatedPower;
}