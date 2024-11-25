import { energyRaport } from "../../types/energy-raport";
import { weatherCondition } from "../../types/weather-condition";
import { windTurbineProperties } from "../../types/wind-turbine-properties";
import lerp from "./linearInterpolationFunction";

export function generateWindEnergyRaport(
    weatherConditions: weatherCondition[],
    windTurbineProps: windTurbineProperties
): energyRaport[] {
    return weatherConditions.map((weather) => {
        const windSpeedInMs = weather.windspeed / 3.6;

        if (weather.temp > windTurbineProps.T_MAX ||
            weather.temp < windTurbineProps.T_MIN ||
            windSpeedInMs > windTurbineProps.V_MAX ||
            windSpeedInMs < windTurbineProps.V_MIN)
        {
            return { datetime: weather.datetime, power: 0 };
        }

        const higherIndex = windTurbineProps.windSpeed.findIndex(
            (speed) => speed > windSpeedInMs
        );

        if (higherIndex <= 0) {
            return { datetime: weather.datetime, power: 0 };
        }

        const generatedPower = lerp(
            windTurbineProps.windSpeed[higherIndex - 1],
            windTurbineProps.power[higherIndex - 1],
            windTurbineProps.windSpeed[higherIndex],
            windTurbineProps.power[higherIndex],
            windSpeedInMs
        );

        return { datetime: weather.datetime, power: generatedPower };
    });
}

export default generateWindEnergyRaport;
