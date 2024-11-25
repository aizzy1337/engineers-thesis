export function calculateSolarHeightAngle(
    latitudeRad: number,
    sunDeclinationRad: number,
    hourAngle: number
): number {
    return Math.asin(
        Math.sin(sunDeclinationRad) * Math.sin(latitudeRad) +
        Math.cos(sunDeclinationRad) * Math.cos(latitudeRad) *
        Math.cos(hourAngle));
}