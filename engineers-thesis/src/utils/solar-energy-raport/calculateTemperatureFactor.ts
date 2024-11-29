import { solarPanelProperties } from "../../types/solar-panel-properties";
import { weatherCondition } from "../../types/weather-condition";
import { calculateNoctAdjustment } from "./calculateNoctAdjustment";
import { calculateTemperatureByHour } from "./calculateTemperatureByHour";

export function calculateTemperatureFactor(
    weatherCondition: weatherCondition,
    solarPanelProperties: solarPanelProperties
): number[] {
    const temperatureFactors: number[] = [];

    const noctAdjustment = calculateNoctAdjustment(
        solarPanelProperties.T_NOCT,
        solarPanelProperties.T_STD_NOCT,
        solarPanelProperties.Irridance_NOCT,
        solarPanelProperties.Irridance_STC
    );

    for (let hour = 0; hour < 24; hour++) {
        const temp = calculateTemperatureByHour(
            hour,
            parseInt(weatherCondition.sunrise.substring(0, 2)),
            parseInt(weatherCondition.sunset.substring(0, 2)),
            weatherCondition.tempmin,
            weatherCondition.tempmax
        );

        if (temp > solarPanelProperties.T_MAX || temp < solarPanelProperties.T_MIN) {
            temperatureFactors.push(0);
        }
        else {
            const solarPanelTemperature = temp + noctAdjustment;
            const factor = 1 + solarPanelProperties.B_STC * (solarPanelTemperature - solarPanelProperties.T_STC);

            temperatureFactors.push(factor);
        }
    }

    return temperatureFactors;
}