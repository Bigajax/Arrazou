import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
const dir = "_raw-ig";
const arquivos = fs.readdirSync(dir).filter((f) => f.endsWith(".webp") && Number(f.slice(0,2)) > 40).sort();
const COLS = 4, W = 340, H = 425;
const LINHAS = Math.ceil(arquivos.length / COLS);
const tiles = [];
for (let i = 0; i < arquivos.length; i++) {
  const num = arquivos[i].slice(0, 2);
  const buf = await sharp(path.join(dir, arquivos[i])).resize(W, H, { fit: "cover" })
    .composite([{ input: Buffer.from(`<svg width="${W}" height="${H}"><rect x="0" y="0" width="58" height="36" fill="#000"/><text x="8" y="27" font-family="Arial" font-size="26" fill="#0f0" font-weight="bold">${num}</text></svg>`), top: 0, left: 0 }]).toBuffer();
  tiles.push({ input: buf, top: Math.floor(i / COLS) * H, left: (i % COLS) * W });
}
await sharp({ create: { width: COLS * W, height: LINHAS * H, channels: 3, background: "#111" } })
  .composite(tiles).jpeg({ quality: 80 }).toFile("_raw-ig/_folha-contato-2.jpg");
console.log("ok", arquivos.length);
