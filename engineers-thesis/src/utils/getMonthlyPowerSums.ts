export const getMonthlyPowerSums = (date: Date[], power: number[]) => {
    const monthlyPowerMap: Record<string, number> = {};

    date.forEach((date, index) => {
        const monthKey = date.toLocaleDateString("pl-PL", {
            year: "2-digit",
            month: "2-digit",
        });
        monthlyPowerMap[monthKey] = (monthlyPowerMap[monthKey] || 0) + power[index];
    });

    return Object.keys(monthlyPowerMap).map(month => ({
        month,
        totalPower: monthlyPowerMap[month],
    }));
};