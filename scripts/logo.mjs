// Logo: foto de perfil do Instagram recortada no círculo, com fundo transparente.
import sharp from "sharp";
const S = 600;
const mascara = Buffer.from(
  `<svg width="${S}" height="${S}"><circle cx="${S / 2}" cy="${S / 2}" r="${S / 2 - 1}" fill="#fff"/></svg>`,
);
await sharp("_raw-ig/logo-perfil.jpg")
  .resize(S, S, { fit: "cover" })
  .composite([{ input: mascara, blend: "dest-in" }])
  .png()
  .toFile("public/marca/arrazou-logo.png");
console.log("ok");
