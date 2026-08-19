import type { Metadata } from "next";
import CatalogoView from "@/components/CatalogoView";
import { getCategorias, getProdutos, paraResumo } from "@/lib/catalogo";
import { parseFiltros, temFiltro } from "@/lib/filtros";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const filtros = parseFiltros(await searchParams);
  return {
    title: "Catálogo — semijoias em ouro 18k e prata 925",
    description:
      "Todas as peças da ArraZou! Semijoias: brincos, colares, correntes, pulseiras, anéis e conjuntos. Filtre por categoria, material e preço e peça direto no WhatsApp.",
    alternates: { canonical: "/catalogo" },
    // URL com filtro é conteúdo duplicado: útil para a cliente, ruim para o índice.
    robots: temFiltro(filtros) ? { index: false, follow: true } : undefined,
  };
}

export default async function CatalogoPage({ searchParams }: Props) {
  const filtros = parseFiltros(await searchParams);
  const [produtos, categorias] = await Promise.all([
    getProdutos(),
    getCategorias(),
  ]);

  return (
    <main>
      <div className="mx-auto max-w-[1240px] px-5 pt-10 pb-6 md:px-8 md:pt-14">
        <p className="eyebrow text-tinta-clara">Catálogo</p>
        <h1 className="mt-4 max-w-[18ch] font-display text-[32px] leading-tight text-vinho md:text-[44px]">
          Escolha a peça, o resto a gente combina no WhatsApp
        </h1>
      </div>

      <CatalogoView
        produtos={produtos.map(paraResumo)}
        categorias={categorias}
        filtrosIniciais={filtros}
      />
    </main>
  );
}
