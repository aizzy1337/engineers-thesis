export function getDayNumber(
    date: Date
): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const diffInMilliseconds = date.getTime() - startOfYear.getTime();
    return Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
}