export function calculateSolarAzimuthAngle(
    hour: number,
    hourAngleRad: number,
    latitudeRad: number,
    sunDeclinationRad: number,
    solarAltitudeAngleRad: number
): number {
    const cosAzimuth = (
        (Math.sin(sunDeclinationRad) * Math.cos(latitudeRad) -
        Math.cos(sunDeclinationRad) * Math.sin(latitudeRad) * Math.cos(hourAngleRad)) /
        Math.cos(solarAltitudeAngleRad));

    const clampedCosAzimuth = Math.max(-1, Math.min(1, cosAzimuth));
    const solarAzimuth = Math.acos(clampedCosAzimuth);

    const azimuthCorrection = (hour < 12) ? solarAzimuth : (2 * Math.PI - solarAzimuth);
    return azimuthCorrection;
}