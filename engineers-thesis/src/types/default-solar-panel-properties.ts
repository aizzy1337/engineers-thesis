import { solarPanelProperties } from "./solar-panel-properties";

export const defaultSolarPanelProperties: solarPanelProperties = {
    area: 2,
    P_MAX: 375,
    T_MIN: -40,
    T_MAX: 85,
    n_STC: 0.2,
    B_STC: -0.003,
    T_STC: 25,
    T_NOCT: 45,
    T_STD_NOCT: 20,
    Irridance_NOCT: 800,
    Irridance_STC: 1000,
    amount: 10,
    slope: 35,
    azimuth: 180,
    systemLoss: 0.15
}