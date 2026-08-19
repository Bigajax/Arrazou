import { site } from "@/data/site.config";
import { formatarBRL } from "@/lib/formato";
import type { Produto, ProdutoResumo } from "@/lib/tipos";

function link(texto: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;
}

/**
 * Mensagem de produto SEMPRE carrega nome e código — é isso que acaba com o
 * vai-e-vem de "qual foto mesmo?" no direct.
 */
export function linkProduto(p: Produto | ProdutoResumo): string {
  const preco = formatarBRL(p.precoPromocional ?? p.preco);
  const texto = p.disponivel
    ? `Oi! Vi no site a peça ${p.nome} (${p.id}) por ${preco}. Ainda tem disponível?`
    : site.mensagens.encomenda(p.nome, p.id);
  return link(texto);
}

export function linkGeral(): string {
  return link(site.mensagens.geral);
}

export function linkBusca(filtro: string): string {
  return link(site.mensagens.catalogo(filtro));
}

export function linkSemResultado(): string {
  return link(site.mensagens.semResultado);
}
