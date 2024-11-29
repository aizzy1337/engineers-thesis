import { energyRaport } from "./energy-raport";

export interface raportChartsProps {
    data: raportCharts
}

export interface raportCharts {
    solarEnergyRaportByArea: energyRaport[],
    solarEnergyRaportByPeak: energyRaport[],
    windEnergyRaportByCurve: energyRaport[],
    windEnergyRaportByArea: energyRaport[],
}