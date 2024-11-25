import { energyRaport } from "../../types/energy-raport";
import { solarPanelProperties } from "../../types/solar-panel-properties";
import { weatherCondition } from "../../types/weather-condition";
import { calculateAngleEffect } from "./calculateAngleEffect";
import { calculateGeneratedPower } from "./calculateGeneratedPower";
import { calculateTemperatureFactor } from "./calculateTemperatureFactor";

function generateSolarEnergyRaport(
    weatherConditions: weatherCondition[],
    solarPanelProperties: solarPanelProperties,
    latitude: number
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
            angleEffect
        );

        solarEnergyRaport.push({
            datetime: weatherCondition.datetime,
            power: Math.max(0, 
                Math.min(
                    generatedPower * solarPanelProperties.amount, solarPanelProperties.P_MAX * solarPanelProperties.amount
                ))
        });
    });

    return solarEnergyRaport;
}

export default generateSolarEnergyRaport;