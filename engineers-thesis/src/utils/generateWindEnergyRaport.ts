import { energyRaport } from "../types/energy-raport";
import { weatherCondition } from "../types/weather-condition";
import { windTurbineProperties } from "../types/wind-turbine-properties";
import lerp from "./linearInterpolationFunction";

function generateWindEnergyRaport(weatherConditions: weatherCondition[], windTurbineProperties: windTurbineProperties) {
    const windEnergyRaport: energyRaport[] = [];

    weatherConditions.forEach((weatherCondition) => {
        if(weatherCondition.temp > windTurbineProperties.T_MAX || weatherCondition.temp < windTurbineProperties.T_MIN || weatherCondition.windspeed > windTurbineProperties.V_MAX ||
            weatherCondition.windspeed < windTurbineProperties.V_MIN
        ) {
            windEnergyRaport.push({datetime: weatherCondition.datetime, power: 0});
            return;
        } 

        let biggerIndex = -1;
        for (let i=0; i<windTurbineProperties.power.length; i++) {
            if (windTurbineProperties.windSpeed[i] > weatherCondition.windspeed) {
                biggerIndex = i;
                break;
            }
        }

        if(biggerIndex < 1) {
            windEnergyRaport.push({datetime: weatherCondition.datetime, power: 0});
            return;
        }

        const generatedPower: number = lerp(windTurbineProperties.windSpeed[biggerIndex-1], windTurbineProperties.power[biggerIndex-1], windTurbineProperties.windSpeed[biggerIndex], windTurbineProperties.power[biggerIndex], weatherCondition.windspeed);

        windEnergyRaport.push({datetime: weatherCondition.datetime, power: generatedPower});
    });

    return windEnergyRaport;
}

export default generateWindEnergyRaport;