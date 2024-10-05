import { energyRaport } from "./energy-raport";

export interface raportChartsProps {
    data: raportCharts
}

export interface raportCharts {
    solarEnergyRaport: energyRaport[],
    windEnergyRaport: energyRaport[]
}