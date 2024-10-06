import { energyRaport } from "../types/energy-raport";
import { solarPanelProperties } from "../types/solar-panel-properties";
import { weatherCondition } from "../types/weather-condition";

function generateSolarEnergyRaport(weatherConditions: weatherCondition[], solarPanelProperties: solarPanelProperties): energyRaport[] {
    const solarEnergyRaport: energyRaport[] = [];
    
    weatherConditions.forEach((weatherCondition) => {
        if(weatherCondition.temp > solarPanelProperties.T_MAX || weatherCondition.temp < solarPanelProperties.T_MIN) {
            solarEnergyRaport.push({datetime: weatherCondition.datetime, power: 0});
            return;
        }

        const solarPanelTemperature: number = weatherCondition.temp + ((solarPanelProperties.T_NOCT - solarPanelProperties.T_STD_NOCT)/solarPanelProperties.Irridance_NOCT) * solarPanelProperties.Irridance_STC;
        const generatedPower: number = solarPanelProperties.area * weatherCondition.solarradiation * solarPanelProperties.n_STC * (1 - solarPanelProperties.B_STC * (solarPanelTemperature - solarPanelProperties.T_STC));

        solarEnergyRaport.push({datetime: weatherCondition.datetime, power: (generatedPower > solarPanelProperties.P_MAX) ? solarPanelProperties.P_MAX * solarPanelProperties.amount : generatedPower * solarPanelProperties.amount});
    });

    return solarEnergyRaport;
}

export default generateSolarEnergyRaport;