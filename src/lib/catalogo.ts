// Única porta de entrada dos dados do catálogo.
//
// REGRA DO PROJETO: nenhum componente importa "@/data/produtos" direto.
// Tudo passa por aqui. Na v2 (Supabase) troca-se só o corpo destas funções e
// nenhuma tela do site precisa ser reescrita — por isso todas já são async.
import "server-only";

import { PRODUTOS } from "@/data/produtos";
import { aplicarFiltros } from "@/lib/filtros";
import {
  NOMES_CATEGORIA,
  type Categoria,
  type CategoriaResumo,
  type Filtros,
  type Produto,
  type ProdutoResumo,
} from "@/lib/tipos";

export async function getProdutos(filtros?: Filtros): Promise<Produto[]> {
  const ativos = PRODUTOS;
  if (!filtros) return [...ativos];
  return aplicarFiltros(ativos.map(paraResumoInterno), filtros).map(
    (r) => ativos.find((p) => p.id === r.id)!,
  );
}

export async function getProdutoPorSlug(slug: string): Promise<Produto | null> {
  return PRODUTOS.find((p) => p.slug === slug) ?? null;
}

export async function getCategorias(): Promise<CategoriaResumo[]> {
  const contagem = new Map<Categoria, number>();
  for (const p of PRODUTOS) {
    contagem.set(p.categoria, (contagem.get(p.categoria) ?? 0) + 1);
  }
  return [...contagem.entries()]
    .map(([id, quantidade]) => ({ id, nome: NOMES_CATEGORIA[id], quantidade }))
    .sort((a, b) => b.quantidade - a.quantidade);
}

export async function getDestaques(limite = 4): Promise<Produto[]> {
  return PRODUTOS.filter((p) => p.destaque && p.disponivel).slice(0, limite);
}

export async function getRelacionados(
  produto: Produto,
  limite = 4,
): Promise<Produto[]> {
  const mesmaCategoria = PRODUTOS.filter(
    (p) => p.id !== produto.id && p.categoria === produto.categoria,
  );
  const resto = PRODUTOS.filter(
    (p) => p.id !== produto.id && p.categoria !== produto.categoria,
  );
  return [...mesmaCategoria, ...resto].slice(0, limite);
}

/** Projeção enxuta para a listagem — só o que o card precisa. */
export function paraResumo(p: Produto): ProdutoResumo {
  return paraResumoInterno(p);
}

function paraResumoInterno(p: Produto): ProdutoResumo {
  return {
    id: p.id,
    slug: p.slug,
    nome: p.nome,
    categoria: p.categoria,
    material: p.material,
    preco: p.preco,
    precoPromocional: p.precoPromocional,
    alt: p.alt,
    disponivel: p.disponivel,
    imagem: p.imagens[0],
  };
}

/**
 * Os números que a home mostra como credencial: quantas peças existem hoje e
 * onde começa e termina o preço. Vem do catálogo, nunca escrito à mão.
 */
export async function getResumoLoja(): Promise<{
  total: number;
  precoMinimo: number;
  precoMaximo: number;
}> {
  const precos = PRODUTOS.map((p) => p.precoPromocional ?? p.preco);
  return {
    total: PRODUTOS.length,
    precoMinimo: Math.min(...precos),
    precoMaximo: Math.max(...precos),
  };
}
