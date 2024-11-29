import { energyRaport } from "../../types/energy-raport";
import { solarPanelProperties } from "../../types/solar-panel-properties";
import { weatherCondition } from "../../types/weather-condition";
import { calculateAngleEffect } from "./calculateAngleEffect";
import { calculateGeneratedPower } from "./calculateGeneratedPower";
import { calculateTemperatureFactor } from "./calculateTemperatureFactor";

function generateSolarEnergyRaport(
    weatherConditions: weatherCondition[],
    solarPanelProperties: solarPanelProperties,
    latitude: number,
    byArea: boolean = true
): energyRaport[] {
    const solarEnergyRaport: energyRaport[] = [];

    weatherConditions.forEach((weatherCondition) => {
        const temperatureFactor: number[] = calculateTemperatureFactor(
            weatherCondition,
            solarPanelProperties
        );
        const angleEffect: number[] = calculateAngleEffect(
            weatherCondition,
            solarPanelProperties,
            latitude
        );
        const generatedPower: number = calculateGeneratedPower(
            weatherCondition,
            solarPanelProperties,
            temperatureFactor,
            angleEffect,
            byArea
        );

        solarEnergyRaport.push({
            datetime: weatherCondition.datetime,
            power: Math.max(0, 
                generatedPower * solarPanelProperties.amount / 1000)
        });
    });

    return solarEnergyRaport;
}

export default generateSolarEnergyRaport;