import type { Metadata } from "next";
import Image from "next/image";
import Moldura from "@/components/Moldura";
import Link from "next/link";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import { site } from "@/data/site.config";
import { linkGeral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Sobre a loja",
  description:
    "ArraZou! Semijoias é revenda autorizada Cristali e Montesanto em Maringá. Ouro 18k e prata 925 com garantia no banho, atendimento com hora marcada.",
  alternates: { canonical: "/sobre" },
};

const PASSOS = [
  {
    n: "01",
    titulo: "Escolhe no catálogo",
    texto:
      "Filtra por categoria, material ou preço até achar a peça. O link do filtro pode ser compartilhado — dá pra mandar pra amiga.",
  },
  {
    n: "02",
    titulo: "Chama no WhatsApp",
    texto:
      "O botão já manda a mensagem com o nome e o código da peça. Sem foto perdida, sem 'qual mesmo?'.",
  },
  {
    n: "03",
    titulo: "Retira ou recebe em Maringá",
    texto:
      "Combinamos hora marcada para retirada ou entrega na cidade. O endereço vai no WhatsApp.",
  },
];

export default function SobrePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 py-12 md:px-8 md:py-20 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <p className="eyebrow text-tinta-clara">Sobre a loja</p>
          <h1 className="mt-5 font-display text-[34px] leading-[1.12] text-vinho md:text-[42px] lg:text-[48px]">
            A gente vende semijoia desde antes do site existir.
          </h1>
          <p className="mt-6 max-w-[58ch] text-[15px] leading-relaxed text-tinta">
            A ArraZou! nasceu no Instagram, atendendo mulher de Maringá que
            queria peça bonita, de banho firme, sem pagar preço de joalheria.
            São mais de 550 publicações de peças escolhidas uma a uma — e cada
            venda começou com uma conversa no direct.
          </p>
          <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-tinta">
            Este site é o feed organizado: a mesma seleção, agora com filtro,
            busca e preço que muda sem precisar refazer foto.
          </p>
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8">
          <Moldura className="mx-auto aspect-4/5 w-full max-w-[420px] lg:mx-0 lg:max-w-none">
            <Image
              src="/img/sobre-dona.webp"
              alt="Cliente usando colar e brincos dourados da ArraZou! Semijoias"
              fill
              sizes="(min-width: 1024px) 40vw, 420px"
              loading="eager"
              className="object-cover"
            />
          </Moldura>
        </div>
      </section>

      <section className="bg-vinho text-creme">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 lg:grid-cols-12 md:px-8 md:py-20">
          <div className="lg:col-span-4">
            <p className="eyebrow text-champanhe">Por que revenda autorizada</p>
            <h2 className="mt-5 font-display text-[28px] leading-tight md:text-[36px]">
              Procedência importa
            </h2>
          </div>
          <div className="grid gap-8 lg:col-span-7 lg:col-start-6 md:grid-cols-2">
            <div>
              <h3 className="font-display text-lg text-creme">
                Cristali e Montesanto
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-creme/70">
                Somos revenda autorizada das duas fábricas. A peça chega na
                cartela original, com o mesmo banho que sai da linha.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-creme">
                Garantia no banho
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-creme/70">
                Ouro 18k e prata 925 com garantia da fabricante. Se o banho
                falhar dentro do prazo, a gente aciona a fábrica pra você.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-creme">
                Hipoalergênico
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-creme/70">
                Peças pensadas para uso diário, inclusive para quem tem a pele
                sensível a bijuteria comum.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-creme">
                Preço que a gente atualiza
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-creme/70">
                O valor do site vem do catálogo, não está escrito dentro da
                foto. Mudou o preço, mudou no site.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-tinta-clara">Como comprar</p>
            <h2 className="mt-5 font-display text-[28px] leading-tight text-vinho md:text-[36px]">
              Três passos, um WhatsApp
            </h2>
            <BotaoWhatsApp href={linkGeral()} className="mt-8">
              Falar no WhatsApp
            </BotaoWhatsApp>
          </div>

          <ol className="lg:col-span-7 lg:col-start-6">
            {PASSOS.map((p) => (
              <li
                key={p.n}
                className="flex gap-6 border-t border-[rgba(200,162,74,0.35)] py-7 first:border-t-0 first:pt-0"
              >
                <span className="tabular font-display text-2xl text-ouro-escuro">
                  {p.n}
                </span>
                <div>
                  <h3 className="font-display text-xl text-vinho">
                    {p.titulo}
                  </h3>
                  <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-tinta-clara">
                    {p.texto}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-[rgba(200,162,74,0.35)]">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-12 md:grid-cols-3 md:px-8 md:py-16">
          <div>
            <p className="eyebrow text-tinta-clara">Onde</p>
            <p className="mt-3 text-[15px] leading-relaxed text-tinta">
              {site.atendimento}. O endereço vai no WhatsApp quando você marcar
              o horário.
            </p>
          </div>
          <div>
            <p className="eyebrow text-tinta-clara">Horário</p>
            <p className="mt-3 text-[15px] text-tinta">{site.horario}</p>
          </div>
          <div>
            <p className="eyebrow text-tinta-clara">Também estamos em</p>
            <p className="mt-3 text-[15px] text-tinta">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-ouro pb-0.5 hover:text-vinho"
              >
                @{site.instagram}
              </a>
            </p>
            <p className="mt-4 text-sm text-tinta-clara">
              <Link href="/catalogo" className="border-b border-ouro pb-0.5">
                Ver o catálogo
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
