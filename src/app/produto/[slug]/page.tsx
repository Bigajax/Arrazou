import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import GaleriaProduto from "@/components/GaleriaProduto";
import ProdutoCard from "@/components/ProdutoCard";
import SeloMaterial from "@/components/SeloMaterial";
import { site } from "@/data/site.config";
import {
  getProdutoPorSlug,
  getProdutos,
  getRelacionados,
  paraResumo,
} from "@/lib/catalogo";
import { formatarBRL, precoSchema } from "@/lib/formato";
import { NOMES_CATEGORIA } from "@/lib/tipos";
import { linkProduto } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

// Slug desconhecido vira 404 — mantém a rota 100% estática.
export const dynamicParams = false;

export async function generateStaticParams() {
  const produtos = await getProdutos();
  return produtos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const produto = await getProdutoPorSlug(slug);
  if (!produto) return { title: "Peça não encontrada" };

  const preco = formatarBRL(produto.precoPromocional ?? produto.preco);
  return {
    title: `${produto.nome} — ${preco}`,
    description: produto.descricao,
    alternates: { canonical: `/produto/${produto.slug}` },
    openGraph: {
      title: `${produto.nome} — ${preco} | ${site.nome}`,
      description: produto.descricao,
      images: [{ url: produto.imagens[0], width: 1000, height: 1250 }],
    },
  };
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params;
  const produto = await getProdutoPorSlug(slug);
  if (!produto) notFound();

  const relacionados = await getRelacionados(produto, 4);
  const preco = produto.precoPromocional ?? produto.preco;
  const link = linkProduto(produto);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produto.nome,
    sku: produto.id,
    image: `${site.url}${produto.imagens[0]}`,
    description: produto.descricao,
    material: produto.material === "ouro18k" ? "Ouro 18k" : "Prata 925",
    brand: { "@type": "Brand", name: produto.fornecedor },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: precoSchema(preco),
      availability: produto.disponivel
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${site.url}/produto/${produto.slug}`,
      seller: { "@type": "Organization", name: site.nome },
    },
  };

  return (
    <main className="pb-24 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-14">
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-y-0 -right-[100vw] -left-[100vw] bg-vinho lg:right-0"
            />
            <div className="relative py-8 lg:py-12 lg:pr-10">
              <nav className="mb-7 text-xs text-creme/60 md:mb-9">
                <Link href="/catalogo" className="hover:text-creme">
                  Catálogo
                </Link>
                <span className="mx-2 text-ouro">/</span>
                <Link
                  href={`/catalogo?categoria=${produto.categoria}`}
                  className="hover:text-creme"
                >
                  {NOMES_CATEGORIA[produto.categoria]}
                </Link>
              </nav>
              <div className="mx-auto max-w-[420px] lg:mx-0 lg:max-w-none">
                <GaleriaProduto imagens={produto.imagens} alt={produto.alt} />
              </div>
            </div>
          </div>

          <div className="pb-10 lg:py-12">
            <p className="eyebrow text-tinta-clara">
              {NOMES_CATEGORIA[produto.categoria]} ·{" "}
              {produto.material === "ouro18k" ? "Ouro 18k" : "Prata 925"}
            </p>

            <h1 className="mt-4 font-display text-[30px] leading-tight text-vinho md:text-[40px]">
              {produto.nome}
            </h1>

            <div className="mt-5 flex items-baseline gap-3">
              {produto.precoPromocional && (
                <span className="tabular text-base text-tinta-clara line-through">
                  {formatarBRL(produto.preco)}
                </span>
              )}
              <span
                className={`tabular text-[28px] font-medium ${
                  produto.precoPromocional ? "text-rubi" : "text-vinho"
                }`}
              >
                {formatarBRL(preco)}
              </span>
            </div>

            {!produto.disponivel && (
              <p className="mt-4 inline-block bg-rubi px-3 py-1.5 text-[11px] tracking-[0.18em] text-creme uppercase">
                Esgotado — dá pra encomendar
              </p>
            )}

            <hr className="hairline my-7 border-t" />

            <p className="max-w-[62ch] text-[15px] leading-relaxed text-tinta">
              {produto.descricao}
            </p>

            <div className="mt-8 border-t border-[var(--fio-ouro)] pt-6">
              <p className="eyebrow text-tinta-clara">Na cartela</p>
              <dl className="mt-4 text-sm">
                {[
                  { rotulo: "Código", valor: produto.id, tabular: true },
                  ...(produto.medidas
                    ? [{ rotulo: "Medidas", valor: produto.medidas }]
                    : []),
                  { rotulo: "Fornecedor", valor: produto.fornecedor },
                  { rotulo: "Garantia", valor: "No banho, pela fabricante" },
                ].map((linha) => (
                  <div
                    key={linha.rotulo}
                    className="flex gap-4 border-b border-[rgba(200,162,74,0.2)] py-2.5 last:border-b-0"
                  >
                    <dt className="w-28 shrink-0 text-tinta-clara">
                      {linha.rotulo}
                    </dt>
                    <dd
                      className={`text-tinta ${linha.tabular ? "tabular" : ""}`}
                    >
                      {linha.valor}
                    </dd>
                  </div>
                ))}
                <div className="flex gap-4 py-2.5">
                  <dt className="w-28 shrink-0 text-tinta-clara">Material</dt>
                  <dd>
                    <SeloMaterial
                      material={produto.material}
                      className="text-tinta"
                    />
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 hidden md:block">
              <BotaoWhatsApp href={link} className="w-full">
                {produto.disponivel
                  ? "Pedir no WhatsApp"
                  : "Encomendar no WhatsApp"}
              </BotaoWhatsApp>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-tinta-clara">
              {site.atendimento} — combinamos retirada ou entrega pelo WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-5 pb-16 md:px-8 md:pb-24">
          <h2 className="eyebrow border-t border-[rgba(200,162,74,0.35)] pt-8 text-tinta-clara">
            Outras que combinam
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
            {relacionados.map((p) => (
              <ProdutoCard key={p.id} produto={paraResumo(p)} />
            ))}
          </div>
        </section>
      )}

      {/* Barra fixa no mobile — o botão de pedir nunca sai da tela */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(200,162,74,0.35)] bg-creme-fundo/95 px-5 py-3 backdrop-blur-sm md:hidden">
        <div className="flex items-center gap-4">
          <div className="min-w-0">
            <p className="truncate text-xs text-tinta-clara">{produto.nome}</p>
            <p className="tabular text-base font-medium text-vinho">
              {formatarBRL(preco)}
            </p>
          </div>
          <BotaoWhatsApp href={link} className="ml-auto shrink-0">
            {produto.disponivel ? "Pedir" : "Encomendar"}
          </BotaoWhatsApp>
        </div>
      </div>
    </main>
  );
}
