// Visualizador com grade percentual — pra escolher recortes com precisão.
import sharp from "sharp";
import path from "node:path";

const arquivos = process.argv.slice(3);
const saida = process.argv[2];
const W = 640;
const COLS = 2;

const tiles = [];
let maxH = 0;
const prontos = [];
for (const f of arquivos) {
  const src = path.join("_raw-ig", f);
  const meta = await sharp(src).metadata();
  const H = Math.round((meta.height / meta.width) * W);
  maxH = Math.max(maxH, H);
  let svg = `<svg width="${W}" height="${H}">`;
  for (let p = 10; p < 100; p += 10) {
    const x = Math.round((p / 100) * W);
    const y = Math.round((p / 100) * H);
    svg += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#00ff00" stroke-width="1" opacity="0.55"/>`;
    svg += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#00ff00" stroke-width="1" opacity="0.55"/>`;
    svg += `<text x="${x + 2}" y="14" font-family="Arial" font-size="13" fill="#00ff00" font-weight="bold">${p}</text>`;
    svg += `<text x="2" y="${y - 3}" font-family="Arial" font-size="13" fill="#00ff00" font-weight="bold">${p}</text>`;
  }
  svg += `<rect x="0" y="${H - 26}" width="120" height="26" fill="#000"/><text x="6" y="${H - 7}" font-family="Arial" font-size="18" fill="#0ff" font-weight="bold">${f.slice(0, 2)}</text></svg>`;
  const buf = await sharp(src).resize(W, H).composite([{ input: Buffer.from(svg), top: 0, left: 0 }]).toBuffer();
  prontos.push({ buf, H });
}
prontos.forEach((p, i) => {
  tiles.push({ input: p.buf, top: Math.floor(i / COLS) * maxH, left: (i % COLS) * W });
});
await sharp({ create: { width: COLS * W, height: Math.ceil(prontos.length / COLS) * maxH, channels: 3, background: "#111" } })
  .composite(tiles).jpeg({ quality: 82 }).toFile(saida);
console.log("ok", saida);
