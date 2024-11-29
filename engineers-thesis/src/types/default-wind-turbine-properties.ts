import { windTurbineProperties } from "./wind-turbine-properties";

export const defaultWindTurbineProperties: windTurbineProperties = {
    power: [0, 0, 100, 300, 500, 800, 1200, 1600, 2000, 2500, 3000, 3500, 4000, 3700, 3400, 3000, 2500, 2000, 1500, 1000],
    windSpeed: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    T_MIN: -40,
    T_MAX: 60,
    V_MIN: 3,
    V_MAX: 25,
    diameter: 4,
    systemLoss: 0.15,
    efficiency: 0.425
}