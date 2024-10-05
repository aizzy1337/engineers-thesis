import { solarPanelProperties } from "./solar-panel-properties"
import { windTurbineProperties } from "./wind-turbine-properties"

export interface raportPropertiesProps {
    data: raportProperties;
    callback: (properties: raportProperties) => void;
}

export interface raportProperties {
    windTurbine: windTurbineProperties,
    solarPanel: solarPanelProperties
}