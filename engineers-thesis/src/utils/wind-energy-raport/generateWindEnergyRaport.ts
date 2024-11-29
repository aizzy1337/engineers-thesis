import { energyRaport } from "../../types/energy-raport";
import { weatherCondition } from "../../types/weather-condition";
import { windTurbineProperties } from "../../types/wind-turbine-properties";
import { powerOutput } from "./calculatePowerOutput";
import { calculateScaleParameter } from "./calculateScaleParameter";
import { calculateShapeParameter } from "./calculateShapeParameter";
import { generateHourlyWindSpeeds } from "./generateHourlyWindSpeeds";

export function generateWindEnergyRaport(
    weatherConditions: weatherCondition[],
    windTurbineProps: windTurbineProperties,
    byCurve: boolean = true
): energyRaport[] {
    return weatherConditions.map((weather) => {
        if (weather.tempmin < windTurbineProps.T_MIN || weather.tempmax > windTurbineProps.T_MAX) {
            return { datetime: weather.datetime, power: 0 };
        }

        const windSpeedAvg = weather.windspeed / 3.6;
        const windSpeedsForDay = Array.from({ length: 24 }, () => windSpeedAvg);
        const k = calculateShapeParameter(windSpeedsForDay);
        const c = calculateScaleParameter(windSpeedAvg, k);

        const hourlySpeeds = generateHourlyWindSpeeds(k, c);

        const dailyEnergy = hourlySpeeds.reduce((totalEnergy, speed) => {
            if (speed < windTurbineProps.V_MIN || speed > windTurbineProps.V_MAX) {
                return totalEnergy;
            }

            const generatedPower = powerOutput(speed, weather, windTurbineProps, byCurve);
            return totalEnergy + generatedPower;
        }, 0);

        return { datetime: weather.datetime, power: dailyEnergy / 1000 };
    });
}

export default generateWindEnergyRaport;