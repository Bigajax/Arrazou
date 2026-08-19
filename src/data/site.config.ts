// Configuração do site. É aqui que a loja mexe.
//
// ⚠️ WHATSAPP: número ainda é PLACEHOLDER. Trocar pela linha comercial real
// (só dígitos, com 55 + DDD). Depois disso, nada mais precisa ser alterado.
export const site = {
  nome: "ArraZou! Semijoias",
  nomeCurto: "ArraZou!",
  url: "https://arrazousemijoias.com.br",
  descricao:
    "Semijoias banhadas a ouro 18k e prata 925 com garantia no banho. Revenda autorizada Cristali e Montesanto, em Maringá/PR.",

  whatsapp: "5544999999999", // ⚠️ PLACEHOLDER — trocar pelo número real
  instagram: "arrazousemijoias",
  instagramUrl: "https://www.instagram.com/arrazousemijoias/",
  facebookUrl: "https://fb.com/arrazousemijoias",

  cidade: "Maringá",
  estado: "PR",
  cep: "87013-050",
  // Atendimento é em endereço residencial: só é passado no WhatsApp, com hora marcada.
  atendimento: "Atendimento em Maringá/PR com hora marcada",
  horario: "Segunda a sábado, 9h às 18h", // ⚠️ confirmar com a loja

  fornecedores: ["Cristali", "Montesanto"] as const,

  mensagens: {
    geral: "Oi! Vim pelo site da ArraZou e queria ver as peças.",
    catalogo: (filtro: string) =>
      `Oi! Vim pelo site da ArraZou e estou procurando ${filtro}. O que você tem?`,
    semResultado:
      "Oi! Procurei no site da ArraZou e não achei a peça que eu queria. Vocês conseguem procurar pra mim?",
    encomenda: (nome: string, id: string) =>
      `Oi! A peça ${nome} (${id}) está esgotada no site. Consegue encomendar pra mim?`,
  },
};

export type Site = typeof site;
