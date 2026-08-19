// Recorte das fotos do Instagram para o catálogo.
// Cada peça vira uma foto 4:5 fechada nela — o que também tira da imagem o
// preço que a loja escrevia por cima (o preço passa a viver na <Etiqueta>).
// Caixa = [x0, y0, x1, y1] em % da foto original.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ORIG = "_raw-ig";
const DEST = "public/img";
const L = 1000;
const A = 1250;

export const PECAS = [
  // --- colares / correntes / gargantilhas ---
  { slug: "colar-perola-coracao", src: "43", box: [38, 20, 100, 100] },
  { slug: "corrente-flor-zirconia", src: "46", box: [15, 25, 52, 90] },
  { slug: "corrente-elos-redondos", src: "46", box: [33, 12, 70, 88] },
  { slug: "corrente-zirconia", src: "46", box: [60, 34, 97, 88] },
  { slug: "corrente-laco-prata", src: "48", box: [58, 45, 96, 92] },
  { slug: "gargantilha-gota-zirconia", src: "51", box: [36, 10, 78, 58] },
  { slug: "conjunto-zirconia-verde", src: "53", box: [6, 14, 50, 69] },

  // --- pulseiras ---
  { slug: "pulseira-prata-corrente-fina", src: "44", box: [4, 10, 52, 42] },
  { slug: "pulseira-arvore-da-vida", src: "44", box: [18, 33, 72, 72] },
  { slug: "pulseira-borboleta", src: "44", box: [32, 60, 84, 98] },
  { slug: "pulseira-coracao-perolas", src: "45", box: [30, 20, 86, 62] },
  { slug: "pulseira-berloques", src: "45", box: [2, 58, 54, 98] },

  // --- anéis ---
  { slug: "anel-duplo-zirconia", src: "47", box: [22, 12, 78, 45] },
  { slug: "anel-rubi-retangular", src: "49", box: [40, 2, 95, 42] },

  // --- brincos ---
  { slug: "brinco-ear-hook-zirconia", src: "47", box: [40, 45, 96, 98] },
  { slug: "brinco-laco-prata", src: "48", box: [78, 10, 100, 38] },
  { slug: "brinco-rubi", src: "49", box: [4, 52, 68, 98] },
  { slug: "brinco-argola-onix", src: "50", box: [13, 39, 37, 69] },
  { slug: "brinco-argola-cravejada", src: "50", box: [37, 29, 69, 57] },
  { slug: "brinco-gota-cravejada", src: "50", box: [64, 31, 99, 59] },
  { slug: "brinco-ponto-de-luz", src: "50", box: [22, 46, 50, 81] },
  { slug: "brinco-argola-multifios", src: "50", box: [56, 54, 82, 78] },
  { slug: "brinco-gota-zirconia", src: "51", box: [58, 20, 94, 58] },
  { slug: "brinco-perola-fio", src: "52", box: [15, 14, 53, 48] },
  { slug: "brinco-perola-coracao", src: "52", box: [66, 14, 98, 51] },
  { slug: "brinco-franja", src: "52", box: [7, 55, 45, 99] },
  { slug: "brinco-gota-vazada", src: "52", box: [61, 62, 97, 99] },

  // --- ear cuff ---
  { slug: "brinco-ear-cuff", src: "54", box: [44, 66, 70, 99] },
];

// Fotos de marca (sem preço na etiqueta) — hero, sobre e destaques editoriais.
export const MARCA = [
  // Hero: recorte do banner da própria loja (post 41), fechado só nas peças —
  // fora o texto de cima e a fileira de ícones de baixo. É a única foto de
  // estúdio do acervo; por isso vai com nitidez extra ao ampliar.
  { slug: "hero-vitrine", src: "41", box: [4, 32, 62, 84], l: 1000, a: 1200, nitidez: true },
  { slug: "hero-choker", src: "27", box: [10, 20, 80, 100], l: 1200, a: 1500 },
  { slug: "sobre-dona", src: "24", box: [0, 0, 100, 100], l: 1100, a: 1375 },
  { slug: "editorial-correntes", src: "17", box: [0, 0, 100, 100], l: 1200, a: 1500 },
  { slug: "editorial-argolas", src: "28", box: [0, 0, 100, 100], l: 1200, a: 1500 },
];

const arquivos = fs.readdirSync(ORIG).filter((f) => f.endsWith(".webp"));
const acharSrc = (n) => {
  const f = arquivos.find((a) => a.startsWith(n + "-"));
  if (!f) throw new Error("foto não encontrada: " + n);
  return path.join(ORIG, f);
};

fs.mkdirSync(DEST, { recursive: true });

async function recortar({ slug, src, box, l = L, a = A, nitidez = false }) {
  const arq = acharSrc(src);
  const m = await sharp(arq).metadata();
  const [x0, y0, x1, y1] = box;
  const left = Math.round((x0 / 100) * m.width);
  const top = Math.round((y0 / 100) * m.height);
  const width = Math.min(m.width - left, Math.round(((x1 - x0) / 100) * m.width));
  const height = Math.min(m.height - top, Math.round(((y1 - y0) / 100) * m.height));
  let img = sharp(arq)
    .extract({ left, top, width, height })
    .resize(l, a, { fit: "cover", position: "centre", kernel: "lanczos3" });
  if (nitidez) img = img.sharpen({ sigma: 0.8 });
  await img
    .webp({ quality: nitidez ? 90 : 82 })
    .toFile(path.join(DEST, `${slug}.webp`));
}

for (const p of [...PECAS, ...MARCA]) await recortar(p);
console.log("ok", PECAS.length, "peças +", MARCA.length, "fotos de marca");
