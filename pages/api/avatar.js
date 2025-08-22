export default async function handler(req, res) {
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
    let got = null;
    for (const url of candidates) {
      const r = await fetch(url, { redirect: "follow" });
      if (r.ok) { got = r; break; }
    }
    if (!got) {
      const fb = "https://unavatar.io/fallback.png";
      got = await fetch(`https://unavatar.io/${encodeURIComponent(handle)}?fallback=${encodeURIComponent(fb)}`, { redirect: "follow" });
    }
    if (!got?.ok) return res.status(404).send("not found");

    const ab = await got.arrayBuffer();
    const buff = Buffer.from(ab);
    res.setHeader("Content-Type", got.headers.get("content-type") || "image/png");
    res.setHeader("Cache-Control", "public, max-age=600, s-maxage=600, stale-while-revalidate=86400");
    return res.status(200).send(buff);
  } catch (e) {
    console.error(e);
    return res.status(500).send("proxy error");
  }
}
