"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProdutoCard from "@/components/ProdutoCard";
import {
  aplicarFiltros,
  descreverFiltros,
  temFiltro,
  toQueryString,
} from "@/lib/filtros";
import type {
  CategoriaResumo,
  Filtros,
  Material,
  Ordem,
  ProdutoResumo,
} from "@/lib/tipos";
import { site } from "@/data/site.config";

const MATERIAIS: { id: Material; nome: string }[] = [
  { id: "ouro18k", nome: "Ouro 18k" },
  { id: "prata925", nome: "Prata 925" },
];

const FAIXAS: { valor: number; nome: string }[] = [
  { valor: 5000, nome: "Até R$ 50" },
  { valor: 10000, nome: "Até R$ 100" },
  { valor: 15000, nome: "Até R$ 150" },
  { valor: 25000, nome: "Até R$ 250" },
];

const ORDENS: { id: Ordem; nome: string }[] = [
  { id: "relevancia", nome: "Relevância" },
  { id: "menor-preco", nome: "Menor preço" },
  { id: "maior-preco", nome: "Maior preço" },
];

const campo =
  "h-11 rounded-[4px] border border-[rgba(200,162,74,0.45)] bg-creme px-3 text-sm text-tinta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ouro";

/**
 * O servidor já entrega o grid filtrado (mesmo estado inicial), então não há
 * flash nem re-render vindo do servidor a cada tecla. Depois da hidratação a
 * filtragem é local e a URL é atualizada com replaceState — o link continua
 * compartilhável no WhatsApp, que é o uso real da loja.
 */
export default function CatalogoView({
  produtos,
  categorias,
  filtrosIniciais,
}: {
  produtos: ProdutoResumo[];
  categorias: CategoriaResumo[];
  filtrosIniciais: Filtros;
}) {
  const [filtros, setFiltros] = useState<Filtros>(filtrosIniciais);

  const visiveis = useMemo(
    () => aplicarFiltros(produtos, filtros),
    [produtos, filtros],
  );

  function atualizar(patch: Partial<Filtros>) {
    const proximos = { ...filtros, ...patch };
    setFiltros(proximos);
    const qs = toQueryString(proximos);
    window.history.replaceState(null, "", qs ? `/catalogo?${qs}` : "/catalogo");
  }

  function limpar() {
    setFiltros({});
    window.history.replaceState(null, "", "/catalogo");
  }

  const ativo = temFiltro(filtros);
  const linkBusca = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    site.mensagens.catalogo(descreverFiltros(filtros)),
  )}`;

  return (
    <>
      <div className="sticky top-16 z-30 border-b border-[rgba(200,162,74,0.3)] bg-creme-fundo/95 backdrop-blur-sm md:top-[76px]">
        <div className="mx-auto max-w-[1240px] px-5 py-4 md:px-8">
          {/* categorias — links de verdade, com o clique interceptado */}
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
            <a
              href="/catalogo"
              aria-current={!filtros.categoria ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                atualizar({ categoria: undefined });
              }}
              className={`shrink-0 rounded-[2px] border px-3.5 py-2 text-sm transition-colors duration-200 ${
                !filtros.categoria
                  ? "border-vinho bg-vinho text-creme"
                  : "border-[rgba(200,162,74,0.45)] bg-creme text-tinta hover:border-ouro"
              }`}
            >
              Todas
            </a>
            {categorias.map((c) => {
              const sel = filtros.categoria === c.id;
              return (
                <a
                  key={c.id}
                  href={`/catalogo?${toQueryString({ ...filtros, categoria: c.id })}`}
                  aria-current={sel ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    atualizar({ categoria: sel ? undefined : c.id });
                  }}
                  className={`shrink-0 rounded-[2px] border px-3.5 py-2 text-sm transition-colors duration-200 ${
                    sel
                      ? "border-vinho bg-vinho text-creme"
                      : "border-[rgba(200,162,74,0.45)] bg-creme text-tinta hover:border-ouro"
                  }`}
                >
                  {c.nome}
                </a>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-end gap-3">
            <div className="flex min-w-[190px] flex-1 flex-col gap-1">
              <label htmlFor="busca" className="eyebrow text-tinta-clara">
                Buscar peça
              </label>
              <input
                id="busca"
                type="search"
                value={filtros.busca ?? ""}
                onChange={(e) =>
                  atualizar({ busca: e.target.value || undefined })
                }
                placeholder="colar, argola, ARZ-0004..."
                className={campo}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="material" className="eyebrow text-tinta-clara">
                Material
              </label>
              <select
                id="material"
                value={filtros.material ?? ""}
                onChange={(e) =>
                  atualizar({
                    material: (e.target.value || undefined) as Material,
                  })
                }
                className={campo}
              >
                <option value="">Todos</option>
                {MATERIAIS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="preco" className="eyebrow text-tinta-clara">
                Preço
              </label>
              <select
                id="preco"
                value={filtros.precoMax ?? ""}
                onChange={(e) =>
                  atualizar({ precoMax: Number(e.target.value) || undefined })
                }
                className={campo}
              >
                <option value="">Qualquer</option>
                {FAIXAS.map((f) => (
                  <option key={f.valor} value={f.valor}>
                    {f.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ordem" className="eyebrow text-tinta-clara">
                Ordenar
              </label>
              <select
                id="ordem"
                value={filtros.ordem ?? "relevancia"}
                onChange={(e) => atualizar({ ordem: e.target.value as Ordem })}
                className={campo}
              >
                {ORDENS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.nome}
                  </option>
                ))}
              </select>
            </div>

            {ativo && (
              <button
                type="button"
                onClick={limpar}
                className="h-11 rounded-[4px] border border-[rgba(200,162,74,0.45)] px-4 text-sm text-tinta transition-colors duration-200 hover:bg-creme"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-5 py-8 md:px-8 md:py-12">
        <h2 className="sr-only">Peças do catálogo</h2>
        <p aria-live="polite" className="text-sm text-tinta-clara">
          {visiveis.length === 1
            ? "1 peça encontrada"
            : `${visiveis.length} peças encontradas`}
        </p>

        {visiveis.length > 0 ? (
          <div className="surgir mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {visiveis.map((p, i) => (
              <ProdutoCard key={p.id} produto={p} prioridade={i < 4} />
            ))}
          </div>
        ) : (
          <div className="mt-10 max-w-[46ch] border-t border-[rgba(200,162,74,0.35)] pt-8">
            <p className="font-display text-2xl text-vinho">
              Nenhuma peça com esses filtros.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-tinta-clara">
              Limpe os filtros ou fale com a gente no WhatsApp que a gente
              procura pra você.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={limpar}
                className="rounded-[4px] border border-[rgba(200,162,74,0.55)] px-5 py-3 text-sm text-tinta hover:bg-creme"
              >
                Limpar filtros
              </button>
              <Link
                href={linkBusca}
                target="_blank"
                className="rounded-[4px] bg-ouro px-5 py-3 text-sm font-medium text-vinho hover:bg-champanhe"
              >
                Procurar no WhatsApp
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
