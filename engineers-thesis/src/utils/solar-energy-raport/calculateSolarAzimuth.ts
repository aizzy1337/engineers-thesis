export function calculateSolarAzimuth(
    hourAngle: number,
    latitudeRad: number,
    sunDeclinationRad: number,
    solarHeightAngle: number
): number {
    const azimuthNumerator = Math.sin(sunDeclinationRad) - Math.sin(latitudeRad) * Math.sin(solarHeightAngle);
    const azimuthDenominator = Math.cos(latitudeRad) * Math.cos(solarHeightAngle);

    let azimuth = Math.acos(azimuthNumerator / azimuthDenominator);

    if (hourAngle > 0) {
        azimuth = 2 * Math.PI - azimuth;
    }

    return azimuth;
}