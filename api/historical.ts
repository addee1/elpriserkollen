export default async function handler(req, res) {
    console.log("🟢 API function EXECUTED at:", new Date().toISOString());
    const { area = "SE3", days = "7" } = req.query;

    const numDays = parseInt(days as string, 10);
    const today = new Date();

    const results = [];

    for (let i = 0; i < numDays; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        const url = `https://www.elprisetjustnu.se/api/v1/prices/${year}/${month}-${day}_${area}.json`;

        try {
            const response = await fetch(url);
            if (!response.ok) continue;

            const data = await response.json();

            const avg =
                data.reduce((sum, h) => sum + h.SEK_per_kWh, 0) /
                data.length;

            results.push({
                date: `${year}-${month}-${day}`,
                avg,
            });
        } catch (err) {
            continue;
        }
    }

    res.setHeader(
        "Cache-Control",
        "s-maxage=86400, stale-while-revalidate"
    );
    console.log("📦 Returning fresh calculated data at:", new Date().toISOString());
    res.status(200).json(results.reverse());
}