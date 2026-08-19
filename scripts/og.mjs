// Imagem de compartilhamento (1200x630). Estática, gerada uma vez.
import sharp from "sharp";

const L = 1200;
const A = 630;

const foto = await sharp("public/img/hero-vitrine.webp")
  .resize(560, A, { fit: "cover" })
  .toBuffer();

const logo = await sharp("public/marca/arrazou-logo.png")
  .resize(150, 150)
  .toBuffer();

const texto = Buffer.from(`<svg width="${L}" height="${A}">
  <text x="80" y="330" font-family="Georgia, serif" font-size="52" fill="#F2E5C5">Ouro 18k e prata 925,</text>
  <text x="80" y="392" font-family="Georgia, serif" font-size="52" fill="#F2E5C5">com garantia.</text>
  <text x="80" y="452" font-family="Arial, sans-serif" font-size="16" letter-spacing="2" fill="#C8A24A">REVENDA AUTORIZADA CRISTALI E MONTESANTO</text>
  <text x="80" y="490" font-family="Arial, sans-serif" font-size="16" letter-spacing="2" fill="#C9AFA6">CATALOGO DE SEMIJOIAS EM MARINGA/PR</text>
</svg>`);

await sharp({
  create: { width: L, height: A, channels: 3, background: "#3A000C" },
})
  .composite([
    { input: foto, left: L - 560, top: 0 },
    { input: logo, left: 80, top: 90 },
    { input: texto, left: 0, top: 0 },
  ])
  .jpeg({ quality: 86 })
  .toFile("public/og.jpg");

console.log("ok");
