import { weibullRandom } from "./generateWeibullRandom";

export function generateHourlyWindSpeeds(
    shape: number,
    scale: number,
    hours: number = 24
): number[] {
    return Array.from({ length: hours }, () => weibullRandom(scale, shape));
}