import { weatherCondition } from "../../types/weather-condition";
import { windTurbineProperties } from "../../types/wind-turbine-properties";
import lerp from "./linearInterpolationFunction";

export function powerOutput(
    windSpeed: number,
    weatherConditions: weatherCondition,
    windTurbineProps: windTurbineProperties,
    byCurve: boolean
): number {
    const { windSpeed: windSpeeds, power } = windTurbineProps;

    const higherIndex = windSpeeds.findIndex((speed) => speed > windSpeed);
    if (higherIndex <= 0) return 0;

    const curvePower = lerp(
        windSpeeds[higherIndex - 1], power[higherIndex - 1],
        windSpeeds[higherIndex], power[higherIndex],
        windSpeed
    );

    if(byCurve) {
        return curvePower * (1 - windTurbineProps.systemLoss);
    }
    else {
        const sweptArea = Math.PI * Math.pow(windTurbineProps.diameter / 2, 2);

        const saturationVaporPressure = 6.112 * Math.exp((17.67 * weatherConditions.temp) / (weatherConditions.temp + 243.5));
        const actualVaporPressure = weatherConditions.humidity * saturationVaporPressure;
        const partialPressureDryAir = weatherConditions.pressure * 100 - actualVaporPressure;
        const density = (partialPressureDryAir / (287.05 * (weatherConditions.temp + 273.15))) + (actualVaporPressure / (461.5 * (weatherConditions.temp + 273.15)))

        const windPower = 0.5 * density * sweptArea * Math.pow(windSpeed, 3);

        return windPower * windTurbineProps.efficiency * (1 - windTurbineProps.systemLoss);
    }
}