export function calculateSunDeclination(
    dayNumber: number
): number {
    return 23.45 * Math.sin((360 / 365) * (dayNumber + 284));
}