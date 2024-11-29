export function calculateScaleParameter(
    mean: number,
    shape: number
): number {
    return mean * Math.pow((1 + 1 / shape), 1 / shape);
}