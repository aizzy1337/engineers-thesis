export function weibullRandom(
    scale: number,
    shape: number
): number {
    const u = Math.random();
    return scale * Math.pow(-Math.log(1 - u), 1 / shape);
}