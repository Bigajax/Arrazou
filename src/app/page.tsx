import Image from "next/image";
import Link from "next/link";
import Moldura from "@/components/Moldura";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import Etiqueta from "@/components/Etiqueta";
import FaixaRotativa from "@/components/FaixaRotativa";
import ProdutoCard from "@/components/ProdutoCard";
import { site } from "@/data/site.config";
import {
  getCategorias,
  getDestaques,
  getResumoLoja,
  paraResumo,
} from "@/lib/catalogo";
import { BOTAO, BOTAO_BASE } from "@/lib/botao";
import { linkGeral } from "@/lib/whatsapp";

type ComAtraso = React.CSSProperties & { "--atraso"?: string };
const atraso = (ms: number): ComAtraso => ({ "--atraso": `${ms}ms` });

export default async function Home() {
  const [destaques, categorias, resumo] = await Promise.all([
    getDestaques(4),
    getCategorias(),
    getResumoLoja(),
  ]);

  const credenciais = [
    { valor: `${resumo.total} peças`, nota: "no catálogo hoje" },
    { valor: "Cristali · Montesanto", nota: "revenda autorizada" },
    { valor: "Hora marcada", nota: `retirada ou entrega em ${site.cidade}` },
  ];

  return (
    <main>
      {/* Hero — a vitrine à noite: fundo vinho, a foto é a única fonte de luz
          e a etiqueta pendura na borda entre as duas. */}
      <section className="relative isolate overflow-hidden bg-vinho text-creme">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_85%_at_84%_40%,rgba(117,22,46,0.9),transparent_58%)]"
        />

        {/* A foto sangra até a borda direita da tela no desktop; no celular ela
            abre a página em faixa, antes do texto. */}
        <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-[44%]">
          <div className="revelar relative aspect-5/4 w-full sm:aspect-video lg:aspect-auto lg:h-full">
            <Image
              src="/img/hero-vitrine.webp"
              alt="Duas correntes de malha lisa e uma bracelete cravejada, banhadas a ouro 18k, sobre seda creme"
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-vinho to-transparent lg:hidden"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 hidden w-56 bg-linear-to-r from-vinho via-vinho/70 to-transparent lg:block"
            />
          </div>

          {/* A etiqueta do projeto, aqui pendurada de verdade: o fio desce, o
              furo é o eixo, e ela balança uma vez até assentar. */}
          <div className="absolute bottom-[13%] left-5 z-10 lg:left-7">
            <div className="pendurada relative pt-11">
              <span
                aria-hidden
                className="absolute top-0 left-[11px] h-11 w-px bg-[rgba(200,162,74,0.85)]"
              />
              <Etiqueta
                rotulo="a partir de"
                preco={resumo.precoMinimo}
                className="shadow-[0_10px_28px_rgba(58,0,12,0.5)]"
              />
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
          <div className="py-12 md:py-16 lg:max-w-[52%] lg:py-[72px]">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="entrar sublinha eyebrow inline-block text-champanhe transition-colors duration-200 hover:text-creme"
              style={atraso(60)}
            >
              @{site.instagram}
            </a>

            <h1
              className="entrar mt-6 font-display text-[40px] leading-[0.98] tracking-[-0.015em] sm:text-[54px] md:text-[56px] lg:text-[68px]"
              style={atraso(140)}
            >
              <span className="block">Ouro 18k</span>
              <span className="block">e prata 925,</span>
              <span className="block text-champanhe">com garantia.</span>
            </h1>

            <p
              className="entrar mt-7 max-w-[44ch] text-[15px] leading-[1.75] text-creme/70"
              style={atraso(220)}
            >
              A peça que você viu no story, agora com preço na etiqueta e um
              botão só até o WhatsApp.
            </p>

            <div
              className="entrar mt-9 flex flex-wrap items-center gap-3"
              style={atraso(300)}
            >
              <Link
                href="/catalogo"
                className={`group ${BOTAO_BASE} ${BOTAO.primario} w-full px-7 sm:w-auto`}
              >
                Ver catálogo
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  &#8594;
                </span>
              </Link>
              <BotaoWhatsApp
                href={linkGeral()}
                variante="claro"
                className="w-full sm:w-auto"
              >
                Falar no WhatsApp
              </BotaoWhatsApp>
            </div>

            <dl
              className="entrar mt-10 grid max-w-[540px] grid-cols-2 gap-x-6 gap-y-6 border-t border-[rgba(242,229,197,0.18)] pt-7 sm:grid-cols-3"
              style={atraso(380)}
            >
              {credenciais.map((c) => (
                <div key={c.valor}>
                  <dt className="text-[13.5px] text-creme">{c.valor}</dt>
                  <dd className="mt-1.5 text-[12px] leading-snug text-creme/50">
                    {c.nota}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <FaixaRotativa />

      {/* Categorias — chips em etiqueta */}
      <section className="border-b border-[var(--fio-ouro)]">
        <div className="mx-auto max-w-[1240px] px-5 py-10 md:px-8 md:py-12">
          <p className="eyebrow text-tinta-clara">O que você procura</p>
          <div className="no-scrollbar -mx-5 mt-5 flex gap-2.5 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
            {categorias.map((c) => (
              <Link
                key={c.id}
                href={`/catalogo?categoria=${c.id}`}
                className="shrink-0 rounded-[2px] border border-[var(--fio-ouro)] bg-creme px-4 py-2.5 text-sm text-tinta transition-colors duration-200 hover:border-ouro hover:text-vinho"
              >
                {c.nome}
                <span className="tabular ml-2 text-xs text-tinta-clara">
                  {c.quantidade}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destaques — a placa da vitrine: painel vinho sangrando pela esquerda,
          e as quatro molduras expostas ao lado dele, sobre o creme. */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1240px] px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-4">
            <div
              aria-hidden
              className="absolute inset-y-0 -right-[100vw] -left-[100vw] bg-vinho lg:right-0"
            />
            <div className="relative py-12 lg:py-24 lg:pr-10">
              <p className="eyebrow text-champanhe">Destaques da semana</p>
              <h2 className="mt-5 font-display text-[32px] leading-[1.04] text-creme md:text-[42px]">
                As que estão{" "}
                <span className="text-champanhe">saindo agora</span>
              </h2>
              <p className="mt-5 max-w-[32ch] text-sm leading-relaxed text-creme/65">
                Peça vista, peça pedida. Se acabar, a gente encomenda — é só
                chamar.
              </p>
              <Link
                href="/catalogo"
                className={`group mt-8 ${BOTAO_BASE} ${BOTAO.claro}`}
              >
                Ver catálogo completo
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  &#8594;
                </span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 py-14 md:gap-6 lg:col-span-8 lg:py-24">
            {destaques.map((p, i) => (
              <ProdutoCard
                key={p.id}
                produto={paraResumo(p)}
                prioridade={i < 2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Faixa de garantias */}
      <section className="bg-vinho text-creme">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-12 md:grid-cols-3 md:px-8 md:py-14">
          {[
            {
              titulo: "Garantia no banho",
              texto:
                "Banho de ouro 18k com garantia da fabricante. Deu problema, a gente resolve.",
            },
            {
              titulo: "Revenda autorizada",
              texto:
                "Cristali e Montesanto. Procedência de fábrica, nota e cartela.",
            },
            {
              titulo: "Entrega em Maringá",
              texto:
                "Retirada com hora marcada ou entrega na cidade, combinada no WhatsApp.",
            },
          ].map((item) => (
            <div key={item.titulo}>
              <span
                aria-hidden
                className="block h-px w-10 bg-[rgba(200,162,74,0.7)]"
              />
              <h3 className="mt-5 font-display text-xl text-creme">
                {item.titulo}
              </h3>
              <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-creme/70">
                {item.texto}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Banda editorial — frase da própria marca */}
      <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-8 md:py-24">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <Moldura className="aspect-4/5 md:col-span-5">
            <Image
              src="/img/editorial-correntes.webp"
              alt="Correntes douradas de malha larga sobre papel kraft"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </Moldura>
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow text-tinta-clara">A gente acredita nisso</p>
            <blockquote className="mt-6 font-display text-[28px] leading-[1.2] text-vinho md:text-[40px]">
              Brilho que realça sua essência.
            </blockquote>
            <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-tinta-clara">
              Semijoia boa não é a que aparece mais. É a que você põe de manhã e
              esquece que está usando — e alguém repara.
            </p>
            <Link
              href="/sobre"
              className="mt-7 inline-block border-b border-ouro pb-1 text-sm text-tinta transition-colors duration-200 hover:text-vinho"
            >
              Conhecer a loja
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
