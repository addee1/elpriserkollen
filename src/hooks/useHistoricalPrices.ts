import { useQuery } from "@tanstack/react-query";

export function useHistoricalPrices(area: string, days: number) {
    return useQuery({
        queryKey: ["historical", area, days],
        queryFn: async () => {
            const res = await fetch(
                `/api/historical?area=${area}&days=${days}`
            );
            return res.json();
        },
        staleTime: 1000 * 60 * 60, // 1h frontend cache
    });
}