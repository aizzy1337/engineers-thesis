export function calculateSolarAltitudeAngle(
    latitudeRad: number,
    sunDeclinationRad: number,
    hourAngleRad: number
): number {
    const sinAltitude = ( 
        Math.sin(latitudeRad) * Math.sin(sunDeclinationRad) +
        Math.cos(latitudeRad) * Math.cos(sunDeclinationRad) * Math.cos(hourAngleRad));

    const clampedSinAltitude = Math.max(-1, Math.min(1, sinAltitude));
    const solarAltitudeAngle = Math.asin(clampedSinAltitude);

    return solarAltitudeAngle;
}