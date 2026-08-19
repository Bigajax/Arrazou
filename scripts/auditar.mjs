// Folha de conferência dos recortes finais, com o slug escrito em cada tile.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
const dir = "public/img";
const arquivos = fs.readdirSync(dir).filter((f) => f.endsWith(".webp")).sort();
const COLS = 6, W = 250, H = 312;
const tiles = [];
for (let i = 0; i < arquivos.length; i++) {
  const nome = arquivos[i].replace(".webp", "");
  const buf = await sharp(path.join(dir, arquivos[i])).resize(W, H, { fit: "cover" })
    .composite([{ input: Buffer.from(`<svg width="${W}" height="${H}"><rect x="0" y="${H - 26}" width="${W}" height="26" fill="#000" opacity="0.85"/><text x="5" y="${H - 8}" font-family="Arial" font-size="15" fill="#0f0">${nome}</text></svg>`), top: 0, left: 0 }]).toBuffer();
  tiles.push({ input: buf, top: Math.floor(i / COLS) * H, left: (i % COLS) * W });
}
await sharp({ create: { width: COLS * W, height: Math.ceil(arquivos.length / COLS) * H, channels: 3, background: "#111" } })
  .composite(tiles).jpeg({ quality: 80 }).toFile("_raw-ig/_auditoria.jpg");
console.log("ok", arquivos.length);
