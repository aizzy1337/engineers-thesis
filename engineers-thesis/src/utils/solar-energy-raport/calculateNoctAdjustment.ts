export function calculateNoctAdjustment(
    T_NOCT: number,
    T_STD_NOCT: number,
    Irridance_NOCT: number,
    Irridance_STC: number
): number {
    return (T_NOCT - T_STD_NOCT) / 
    Irridance_NOCT * 
    Irridance_STC;
}