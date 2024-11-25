import { solarPanelProperties } from "../../types/solar-panel-properties";
import { weatherCondition } from "../../types/weather-condition";
import { calculateSolarAzimuth } from "./calculateSolarAzimuth";
import { calculateSolarHeightAngle } from "./calculateSolarHeightAngle";
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
        const hourAngle = convertToRadians(15 * (hour - 12));

        const solarHeightAngle = calculateSolarHeightAngle(
            latitudeRad,
            sunDeclinationRad,
            hourAngle
        );

        const solarAzimuth = calculateSolarAzimuth(
            hourAngle,
            latitudeRad,
            sunDeclinationRad,
            solarHeightAngle
        );

        const panelAngleEffect =
            Math.cos(solarHeightAngle) * Math.cos(slopeRad) +
            Math.sin(solarHeightAngle) * Math.sin(slopeRad) *
            Math.cos(solarAzimuth - panelAzimuthRad);

        angleEffect.push(Math.max(0, panelAngleEffect));
    }

    return angleEffect;
}
