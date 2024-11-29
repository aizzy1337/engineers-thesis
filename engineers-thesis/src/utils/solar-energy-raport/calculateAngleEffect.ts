import { solarPanelProperties } from "../../types/solar-panel-properties";
import { weatherCondition } from "../../types/weather-condition";
import { calculateSolarAzimuthAngle } from "./calculateSolarAzimuthAngle";
import { calculateSolarAltitudeAngle} from "./calculateSolarAltitudeAngle";
import { calculateSunDeclination } from "./calculateSunDeclination";
import { convertToRadians } from "./convertToRadians";
import { getDayNumber } from "./getDayNumber";

export function calculateAngleEffect(
    weatherCondition: weatherCondition,
    solarPanelProperties: solarPanelProperties,
    latitude: number
): number[] {
    const angleEffect: number[] = [];

    const dayNumber = getDayNumber(
        new Date(weatherCondition.datetime));
    const sunDeclinationRad = convertToRadians(
        calculateSunDeclination(dayNumber));
    const latitudeRad = convertToRadians(latitude);
    const slopeRad = convertToRadians(solarPanelProperties.slope);
    const panelAzimuthRad = convertToRadians(solarPanelProperties.azimuth);

    for (let hour = 0; hour < 24; hour++) {
        const hourAngleRad = convertToRadians(15 * (hour - 12));

        const solarAltitudeAngleRad = calculateSolarAltitudeAngle(
                latitudeRad,
                sunDeclinationRad,
                hourAngleRad
            )

        const solarAzimuthAngleRad = calculateSolarAzimuthAngle(
                hour,
                hourAngleRad,
                latitudeRad,
                sunDeclinationRad,
                solarAltitudeAngleRad
            )

        const panelAngleEffect =
            Math.sin(solarAltitudeAngleRad) * Math.cos(slopeRad) +
            Math.cos(solarAltitudeAngleRad) * Math.sin(slopeRad) *
            Math.cos(panelAzimuthRad - solarAzimuthAngleRad);

        angleEffect.push(Math.max(0, panelAngleEffect));
    }

    return angleEffect;
}
