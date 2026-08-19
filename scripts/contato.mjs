// Folha de contato rotulada — auditoria das fotos antes de entrar no projeto.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const dir = "_raw-ig";
const arquivos = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".webp"))
  .sort();

const COLS = 6;
const W = 260;
const H = 325;
const LINHAS = Math.ceil(arquivos.length / COLS);

const tiles = [];
for (let i = 0; i < arquivos.length; i++) {
  const num = arquivos[i].slice(0, 2);
  const buf = await sharp(path.join(dir, arquivos[i]))
    .resize(W, H, { fit: "cover" })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${W}" height="${H}"><rect x="0" y="0" width="54" height="34" fill="#000"/><text x="8" y="25" font-family="Arial" font-size="24" fill="#0f0" font-weight="bold">${num}</text></svg>`,
        ),
        top: 0,
        left: 0,
      },
    ])
    .toBuffer();
  tiles.push({
    input: buf,
    top: Math.floor(i / COLS) * H,
    left: (i % COLS) * W,
  });
}

await sharp({
  create: {
    width: COLS * W,
    height: LINHAS * H,
    channels: 3,
    background: "#111",
  },
})
  .composite(tiles)
  .jpeg({ quality: 78 })
  .toFile("_raw-ig/_folha-contato.jpg");

console.log("ok", arquivos.length, "fotos");
