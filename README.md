# WHEN TGE — Next.js (Pages Router) Tam Paket

Bu proje; tweet paylaşımı, avatar çekme (proxy), proje seçimi ve logolarla **tek başına çalışır**.

## Kurulum
```bash
npm i
npm run dev
# http://localhost:3000
```

## Avatar Proxy
- Endpoint: **/pages/api/avatar.ts**
- Senin mantığın baz alınarak unavatar kaynakları kullanıldı (fallback'lı).
- Frontend, canvas'a çizerken `/api/avatar?handle=...` çağırır.

## Logolar
- `public/logos/` içine yerleştirildi. Beklenen dosya adı: `<slug>.(png|webp|jpg|svg)`
- Eşleşen logo sayısı: 42
- Eşleşemeyen logo sayısı: 0
