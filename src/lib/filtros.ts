// Lógica de filtro isomórfica: roda no servidor (primeiro render) e no cliente
// (interações). Uma implementação só, para o que o servidor pinta e o que o
// cliente repinta nunca divergirem. Não importa dados — recebe a lista.

import {
  NOMES_CATEGORIA,
  type Categoria,
  type Filtros,
  type Material,
  type Ordem,
  type ProdutoResumo,
} from "@/lib/tipos";

const CATEGORIAS = Object.keys(NOMES_CATEGORIA) as Categoria[];
const MATERIAIS: Material[] = ["ouro18k", "prata925"];
const ORDENS: Ordem[] = ["relevancia", "menor-preco", "maior-preco"];

function primeiro(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

/** Lê e valida os filtros vindos da querystring. Valor inválido é ignorado. */
export function parseFiltros(
  sp: Record<string, string | string[] | undefined>,
): Filtros {
  const categoria = primeiro(sp.categoria) as Categoria | undefined;
  const material = primeiro(sp.material) as Material | undefined;
  const ordem = primeiro(sp.ordem) as Ordem | undefined;
  const precoMax = Number(primeiro(sp.precoMax));

  return {
    categoria: categoria && CATEGORIAS.includes(categoria) ? categoria : undefined,
    material: material && MATERIAIS.includes(material) ? material : undefined,
    precoMax: Number.isFinite(precoMax) && precoMax > 0 ? precoMax : undefined,
    busca: primeiro(sp.busca)?.trim() || undefined,
    apenasDisponiveis: primeiro(sp.disponiveis) === "1" || undefined,
    ordem: ordem && ORDENS.includes(ordem) ? ordem : undefined,
  };
}

/** Monta a querystring a partir dos filtros. Vazio = fora da URL. */
export function toQueryString(f: Filtros): string {
  const p = new URLSearchParams();
  if (f.categoria) p.set("categoria", f.categoria);
  if (f.material) p.set("material", f.material);
  if (f.precoMax) p.set("precoMax", String(f.precoMax));
  if (f.busca) p.set("busca", f.busca);
  if (f.apenasDisponiveis) p.set("disponiveis", "1");
  if (f.ordem && f.ordem !== "relevancia") p.set("ordem", f.ordem);
  return p.toString();
}

export function temFiltro(f: Filtros): boolean {
  return Boolean(
    f.categoria || f.material || f.precoMax || f.busca || f.apenasDisponiveis,
  );
}

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/** Aplica filtros e ordenação. Serve tanto Produto quanto ProdutoResumo. */
export function aplicarFiltros<T extends ProdutoResumo>(
  lista: readonly T[],
  f: Filtros,
): T[] {
  let itens = [...lista];

  if (f.categoria) itens = itens.filter((p) => p.categoria === f.categoria);
  if (f.material) itens = itens.filter((p) => p.material === f.material);
  if (f.precoMax) {
    itens = itens.filter((p) => (p.precoPromocional ?? p.preco) <= f.precoMax!);
  }
  if (f.apenasDisponiveis) itens = itens.filter((p) => p.disponivel);
  if (f.busca) {
    const q = normalizar(f.busca);
    itens = itens.filter(
      (p) =>
        normalizar(p.nome).includes(q) ||
        normalizar(NOMES_CATEGORIA[p.categoria]).includes(q) ||
        normalizar(p.id).includes(q),
    );
  }

  const valor = (p: T) => p.precoPromocional ?? p.preco;
  if (f.ordem === "menor-preco") itens.sort((a, b) => valor(a) - valor(b));
  else if (f.ordem === "maior-preco") itens.sort((a, b) => valor(b) - valor(a));
  else {
    // Relevância: disponível primeiro, depois destaque, depois a ordem do catálogo.
    itens.sort((a, b) => {
      if (a.disponivel !== b.disponivel) return a.disponivel ? -1 : 1;
      return 0;
    });
  }

  return itens;
}

/** Texto legível dos filtros ativos — usado na mensagem do WhatsApp. */
export function descreverFiltros(f: Filtros): string {
  const partes: string[] = [];
  if (f.categoria) partes.push(NOMES_CATEGORIA[f.categoria].toLowerCase());
  if (f.material) partes.push(f.material === "ouro18k" ? "em ouro 18k" : "em prata 925");
  if (f.busca) partes.push(`"${f.busca}"`);
  return partes.length ? partes.join(" ") : "semijoias";
}
