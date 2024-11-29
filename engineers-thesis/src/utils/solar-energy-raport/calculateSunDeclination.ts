import { convertToRadians } from "./convertToRadians";

export function calculateSunDeclination(
    dayNumber: number
): number {
    return 23.45 * Math.sin(convertToRadians((360 / 365) * (dayNumber + 284)));
}