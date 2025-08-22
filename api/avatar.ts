import type { VercelRequest, VercelResponse } from '@vercel/node';

const sources = (handle: string) => [
  `https://unavatar.io/twitter/${encodeURIComponent(handle)}.png`,
  `https://unavatar.io/${encodeURIComponent(handle)}.png`,
  `https://unavatar.io/x/${encodeURIComponent(handle)}.png`,
  `https://unavatar.io/twitter/${encodeURIComponent(handle)}`,
  `https://unavatar.io/${encodeURIComponent(handle)}`,
  `https://unavatar.io/x/${encodeURIComponent(handle)}`,
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const handle = String(req.query.handle || '').replace(/^@/, '');
  if (!handle) return res.status(400).send('Missing handle');

  for (const url of sources(handle)) {
    try {
      const r = await fetch(url, { redirect: 'follow' });
      if (!r.ok) continue;
      const ab = await r.arrayBuffer();
      const type = r.headers.get('content-type') || 'image/png';
      res.setHeader('Content-Type', type);
      res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
      return res.status(200).send(Buffer.from(ab));
    } catch {}
  }

  // Fallback: 1x1 transparent PNG
  const transparent1x1 = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO8rV2cAAAAASUVORK5CYII=',
    'base64'
  );
  res.setHeader('Content-Type', 'image/png');
  return res.status(200).send(transparent1x1);
}
