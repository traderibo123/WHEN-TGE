import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const handle = String(req.query.handle || "").trim().replace(/^@+/, "");
    if (!handle) return res.status(400).send("handle required");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.status(204).end();

    const candidates = [
      `https://unavatar.io/twitter/${encodeURIComponent(handle)}?fallback=false`,
      `https://unavatar.io/${encodeURIComponent(handle)}?fallback=false`,
    ];
    let got: Response | null = null;
    for (const url of candidates) {
      const r = await fetch(url, { redirect: "follow" });
      if (r.ok) { got = r as any; break; }
    }
    if (!got) {
      const fb = "https://unavatar.io/fallback.png";
      got = await fetch(`https://unavatar.io/${encodeURIComponent(handle)}?fallback=${encodeURIComponent(fb)}`, { redirect: "follow" }) as any;
    }
    if (!got?.ok) return res.status(404).send("not found");

    const buff = Buffer.from(await (got as any).arrayBuffer());
    res.setHeader("Content-Type", (got as any).headers.get("content-type") || "image/png");
    res.setHeader("Cache-Control", "public, max-age=600, s-maxage=600, stale-while-revalidate=86400");
    return res.status(200).send(buff);
  } catch (e) {
    console.error(e);
    return res.status(500).send("proxy error");
  }
}
