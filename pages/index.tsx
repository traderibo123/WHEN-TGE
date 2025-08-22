import { useEffect, useMemo, useRef, useState, useCallback } from "react";

type Project = { name: string; handle: string; slug: string; };
const PROJECTS: Project[] = [{"name": "0G Labs", "handle": "0G_labs", "slug": "0g-labs"}, {"name": "Allora", "handle": "AlloraNetwork", "slug": "allora"}, {"name": "Anoma", "handle": "anoma", "slug": "anoma"}, {"name": "Billions Network", "handle": "billions_ntwk", "slug": "billions-network"}, {"name": "Bless", "handle": "theblessnetwork", "slug": "bless"}, {"name": "Cysic", "handle": "cysic_xyz", "slug": "cysic"}, {"name": "EverlynAI", "handle": "everlyn_ai", "slug": "everlynai"}, {"name": "Falcon Finance", "handle": "FalconStable", "slug": "falcon-finance"}, {"name": "Fogo", "handle": "FogoChain", "slug": "fogo"}, {"name": "Hana", "handle": "HanaNetwork", "slug": "hana"}, {"name": "GOAT Network", "handle": "goatrollup", "slug": "goat-network"}, {"name": "Infinex", "handle": "infinex", "slug": "infinex"}, {"name": "Irys", "handle": "irys_xyz", "slug": "irys"}, {"name": "Katana", "handle": "katana", "slug": "katana"}, {"name": "Lombard", "handle": "Lombard_Finance", "slug": "lombard"}, {"name": "Lumiterra", "handle": "lumiterragame", "slug": "lumiterra"}, {"name": "Mavryk", "handle": "MavrykNetwork", "slug": "mavryk"}, {"name": "MegaETH", "handle": "megaeth_labs", "slug": "megaeth"}, {"name": "Mira Network", "handle": "mira_network", "slug": "mira-network"}, {"name": "Mitosis", "handle": "MitosisOrg", "slug": "mitosis"}, {"name": "Momentum", "handle": "mmtfinance", "slug": "momentum"}, {"name": "Monad", "handle": "monad", "slug": "monad"}, {"name": "Moonbirds", "handle": "moonbirds", "slug": "moonbirds"}, {"name": "Multipli", "handle": "multiplifi", "slug": "multipli"}, {"name": "Novastro", "handle": "Novastro_xyz", "slug": "novastro"}, {"name": "Noya.ai", "handle": "NetworkNoya", "slug": "noya-ai"}, {"name": "OpenLedger", "handle": "OpenledgerHQ", "slug": "openledger"}, {"name": "PARADEX", "handle": "tradeparadex", "slug": "paradex"}, {"name": "Portal to BTC", "handle": "PortaltoBitcoin", "slug": "portal-to-btc"}, {"name": "Puffpaw", "handle": "puffpaw_xyz", "slug": "puffpaw"}, {"name": "Somnia", "handle": "Somnia_Network", "slug": "somnia"}, {"name": "Soul Protocol", "handle": "0xSoulProtocol", "slug": "soul-protocol"}, {"name": "Surf", "handle": "surf_copilot", "slug": "surf"}, {"name": "Symphony", "handle": "symphonyio", "slug": "symphony"}, {"name": "Theoriq", "handle": "TheoriqAI", "slug": "theoriq"}, {"name": "Thrive Protocol", "handle": "thriveprotocol", "slug": "thrive-protocol"}, {"name": "Turtle", "handle": "turtledotxyz", "slug": "turtle"}, {"name": "Union", "handle": "union_build", "slug": "union"}, {"name": "Warden Protocol", "handle": "wardenprotocol", "slug": "warden-protocol"}, {"name": "YEET", "handle": "yeet", "slug": "yeet"}, {"name": "Linea", "handle": "LineaBuild", "slug": "linea"}, {"name": "DAWN", "handle": "dawninternet", "slug": "dawn"}] as const;

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [userHandle, setUserHandle] = useState<string>("");
  const [slug, setSlug] = useState<string>(PROJECTS[0].slug);
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  const SIZE = 1200, PADDING = 80;
  const AVATAR_R = 210, LOGO_R = 120;
  const AVATAR_POS = useMemo(() => ({ x: PADDING + AVATAR_R, y: SIZE - PADDING - AVATAR_R }), []);
  const LOGO_POS   = useMemo(() => ({ x: SIZE - PADDING - LOGO_R, y: SIZE/2 + 40 }), []);

  const loadImage = useCallback((url: string) => new Promise<HTMLImageElement>((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = () => rej(new Error("img load fail: " + url));
    img.src = url;
  }), []);

  const placeholderCircle = useCallback((letter = "X", color = "#7c5cff", r = 400) => {
    const off = document.createElement("canvas"); off.width = off.height = r*2;
    const o = off.getContext("2d")!; o.fillStyle = color; o.beginPath(); o.arc(r, r, r, 0, Math.PI*2); o.fill();
    o.fillStyle = "#fff"; o.font = `bold ${Math.floor(r*1.1)}px Arial, sans-serif`; o.textAlign="center"; o.textBaseline="middle";
    o.fillText(letter.toUpperCase(), r, r+10); return off;
  }, []);

  const drawTextWhenTGE = useCallback((ctx: CanvasRenderingContext2D) => {
    const left = PADDING, top = PADDING + 40;
    ctx.save();
    ctx.textBaseline = "top"; ctx.textAlign = "left";
    ctx.shadowColor = "rgba(27,62,168,.9)"; ctx.shadowBlur = 18; ctx.shadowOffsetX = 6; ctx.shadowOffsetY = 6;
    ctx.lineJoin = "round"; ctx.lineWidth = 22; ctx.strokeStyle = "#ffd028";
    const fill = "#ff2d2d"; ctx.font = "900 200px Impact, Arial Black, system-ui, sans-serif";
    ctx.strokeText("WHEN", left, top); ctx.fillStyle = fill; ctx.fillText("WHEN", left, top);
    ctx.strokeText("TGE?", left, top + 230); ctx.fillStyle = fill; ctx.fillText("TGE?", left, top + 230);
    ctx.restore();
  }, []);

  const circleImage = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement | HTMLCanvasElement | null, cx: number, cy: number, r: number) => {
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.closePath(); ctx.clip();
    ctx.fillStyle = "#111418"; ctx.fillRect(cx-r, cy-r, r*2, r*2);
    if (img) ctx.drawImage(img, cx-r, cy-r, r*2, r*2);
    ctx.restore(); ctx.lineWidth = 16; ctx.strokeStyle = "#fff"; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke();
  }, []);

  const loadAvatarByHandle = useCallback(async (raw: string) => {
    const h = (raw || "").trim().replace(/^@+/, "");
    if (!h) return null;
    const url = `/api/avatar?handle=${encodeURIComponent(h)}&cb=${Date.now()}`;
    try { return await loadImage(url); } catch { return null; }
  }, [loadImage]);

  const loadProjectLogo = useCallback(async (s: string, nameFallback = "P") => {
    if (customLogo) { try { return await loadImage(customLogo); } catch {} }
    const base = `/logos/${s}`; const exts = [".png",".webp",".jpg",".svg"];
    for (const ext of exts) { try { return await loadImage(base+ext + "?cb=" + Date.now()); } catch {} }
    const letter = nameFallback?.[0] || "P"; return placeholderCircle(letter, "#7c5cff", 200);
  }, [customLogo, loadImage, placeholderCircle]);

  const renderCanvas = useCallback(async () => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    ctx.fillStyle = "#000"; ctx.fillRect(0,0,SIZE,SIZE);
    drawTextWhenTGE(ctx);

    let avatarImg = await loadAvatarByHandle(userHandle);
    if(!avatarImg) {
      const letter = (userHandle.replace("@","")[0] || "X").toUpperCase();
      avatarImg = placeholderCircle(letter, "#444", AVATAR_R) as any;
    }
    circleImage(ctx, avatarImg, AVATAR_POS.x, AVATAR_POS.y, AVATAR_R);

    const proj = PROJECTS.find(p => p.slug === slug) || PROJECTS[0];
    const logoImg = await loadProjectLogo(slug, proj?.name);
    circleImage(ctx, logoImg, LOGO_POS.x, LOGO_POS.y, LOGO_R);
  }, [AVATAR_POS.x, AVATAR_POS.y, LOGO_POS.x, LOGO_POS.y, AVATAR_R, LOGO_R, SIZE, userHandle, slug, drawTextWhenTGE, loadAvatarByHandle, placeholderCircle, circleImage, loadProjectLogo]);

  useEffect(() => { renderCanvas(); }, [renderCanvas]);

  const projOptions = useMemo(() => PROJECTS.map(p => ({ value: p.slug, label: `${p.name} — @${p.handle}` })), []);

  const onDownload = useCallback(() => {
    const c = canvasRef.current; if (!c) return;
    const a = document.createElement("a");
    a.download = "when-tge.png";
    a.href = c.toDataURL("image/png");
    a.click();
  }, []);

  const onTweet = useCallback(() => {
    const proj = PROJECTS.find(p => p.slug === slug)!;
    const userH = (userHandle || "").trim().replace(/^@+/, "");
    const text = `WHEN TGE? @${proj.handle}${userH ? " @" + userH : ""}`;
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(intent, "_blank");
  }, [slug, userHandle]);

  return (
    <div style={{ maxWidth:1000, margin:"24px auto", padding:16, color:"#e9eef3", fontFamily:"Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial", background:"#0a0b0f" }}>
      <h1 style={{ margin:"0 0 12px", fontSize:22 }}>WHEN TGE? — Basit Meme Uygulaması</h1>

      <div style={{ display:"grid", gap:10, gridTemplateColumns:"1fr 1fr" }}>
        <div>
          <label style={{ fontSize:12, color:"#9aa6b2" }}>Kendi X kullanıcı adın (opsiyonel, tweet’e eklenecek)</label>
          <input value={userHandle} onChange={e=>setUserHandle(e.target.value)} placeholder="ör. traderibo123"
                 style={{ width:"100%", padding:"10px 12px", borderRadius:10, background:"#0f121a", color:"#e9eef3", border:"1px solid #222634" }} />
          <div style={{ color:"#9aa6b2", fontSize:12, marginTop:6 }}>Avatar <code>/api/avatar</code> üzerinden çekilir; sorun olursa harfli placeholder kullanılır.</div>
        </div>

        <div>
          <label style={{ fontSize:12, color:"#9aa6b2" }}>Proje seç (isim + X kullanıcı adı)</label>
          <select value={slug} onChange={e=>setSlug(e.target.value)}
                  style={{ width:"100%", padding:"10px 12px", borderRadius:10, background:"#0f121a", color:"#e9eef3", border:"1px solid "#222634" }}>
            {projOptions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
          <div style={{ color:"#9aa6b2", fontSize:12, marginTop:6 }}>Tweet’te proje otomatik <b>@etiket</b> ile mention edilir.</div>
        </div>
      </div>

      <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginTop:12 }}>
        <button onClick={renderCanvas} style={{ cursor:"pointer", borderRadius:10, padding:"11px 14px", border:"1px solid #222634", background:"#131826", color:"#fff", fontWeight:600 }}>Güncelle</button>
        <button onClick={onDownload} style={{ cursor:"pointer", borderRadius:10, padding:"11px 14px", border:"1px solid #222634", background:"#131826", color:"#fff", fontWeight:600 }}>PNG indir</button>
        <button onClick={onTweet} style={{ cursor:"pointer", borderRadius:10, padding:"11px 14px", border:"1px solid #222634", background:"#131826", color:"#fff", fontWeight:600 }}>X’te paylaş</button>
        <label style={{ position:"relative", overflow:"hidden", borderRadius:10, padding:"11px 14px", border:"1px solid #222634", background:"#131826", color:"#fff", fontWeight:600, cursor:"pointer" }}>
          Özel Logo Yükle
          <input type="file" accept=".png,.svg,.jpg,.jpeg,.webp"
                 onChange={(e)=>{ const f = (e.target as HTMLInputElement).files?.[0]; if(!f) { setCustomLogo(null); return; } const r = new FileReader(); r.onload = ev => setCustomLogo(String(ev.target?.result)); r.readAsDataURL(f); }}
                 style={{ position:"absolute", inset:0, opacity:0, cursor:"pointer" }} />
        </label>
      </div>

      <div style={{ marginTop:14, display:"flex", justifyContent:"center" }}>
        <canvas ref={canvasRef} width={1200} height={1200} style={{ width:"100%", maxWidth:980, border:"1px solid #222634", borderRadius:16, background:"#000" }} />
      </div>

      <div style={{ marginTop:10, color:"#9aa6b2", fontSize:12 }}>
        Düzen: Üst-sol <b>“WHEN TGE?”</b>, alt-sol avatar çemberi, sağda proje logosu çemberi. Logolar <code>/logos/&lt;slug&gt;.ext</code> olarak çağrılır.
      </div>
    </div>
  );
}
