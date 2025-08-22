# WHEN TGE — Meme Maker (Vercel + avatar proxy)

- `public/index.html` -> Uygulama
- `api/avatar.ts` -> Avatar proxy (unavatar -> CORS-safe)
- `public/logos/` -> Logoları slug adına göre buraya koy (ör. `novastro.png`)

## Çalıştırma
1) `npm i -g vercel` (eğer yüklü değilse)
2) Proje klasöründe `vercel dev` (lokalde)
3) Deploy: `vercel`

Uygulama, avatarı `/api/avatar?handle=<kullanici>` ile çeker.
