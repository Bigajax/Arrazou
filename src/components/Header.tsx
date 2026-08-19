import Image from "next/image";
import Link from "next/link";
import IconeWhatsApp from "@/components/IconeWhatsApp";
import { site } from "@/data/site.config";
import { linkGeral } from "@/lib/whatsapp";

/**
 * Barra vinho em todas as páginas — faz par com o rodapé, que já era escuro,
 * e emenda direto no hero sem costura. O selo da marca vem acompanhado da
 * cidade, porque loja de bairro se apresenta dizendo onde fica.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(242,229,197,0.16)] bg-vinho/95 text-creme backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 sm:gap-3.5"
          aria-label={`${site.nome} — página inicial`}
        >
          <Image
            src="/marca/arrazou-logo.png"
            alt=""
            width={600}
            height={600}
            className="h-10 w-10 rounded-full md:h-11 md:w-11"
            loading="eager"
          />
          <span className="leading-none">
            <span className="block font-display text-[19px] text-creme md:text-[21px]">
              {site.nomeCurto}
            </span>
            <span className="eyebrow mt-1.5 block text-[8.5px] whitespace-nowrap text-champanhe/65 md:text-[9.5px]">
              <span className="hidden sm:inline">Semijoias · </span>
              {site.cidade} {site.estado}
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-3.5 sm:gap-6 md:gap-8">
          <Link
            href="/catalogo"
            className="sublinha text-[12.5px] tracking-[0.02em] text-creme/70 transition-colors duration-200 hover:text-creme sm:text-[13px]"
          >
            Catálogo
          </Link>
          <Link
            href="/sobre"
            className="sublinha text-[12.5px] tracking-[0.02em] text-creme/70 transition-colors duration-200 hover:text-creme sm:text-[13px]"
          >
            Sobre
          </Link>
          <a
            href={linkGeral()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[2px] border border-[rgba(242,229,197,0.35)] px-3 text-[13px] text-creme transition-colors duration-200 hover:border-creme hover:bg-creme hover:text-vinho md:px-4"
          >
            <IconeWhatsApp className="h-[17px] w-[17px]" />
            <span className="hidden md:inline">WhatsApp</span>
            <span className="sr-only md:hidden">Falar no WhatsApp</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
