import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site.config";
import { linkGeral } from "@/lib/whatsapp";

export default function Rodape() {
  return (
    <footer className="bg-vinho text-creme">
      <div className="mx-auto max-w-[1240px] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[auto_1fr_1fr_1fr] md:gap-10">
          <div>
            <Image
              src="/marca/arrazou-logo.png"
              alt="ArraZou! Semijoias"
              width={600}
              height={600}
              className="h-20 w-20"
            />
            <p className="mt-5 max-w-[24ch] text-sm leading-relaxed text-creme/70">
              Semijoias banhadas a ouro 18k e prata 925, com garantia no banho.
            </p>
          </div>

          <div>
            <p className="eyebrow text-champanhe">Catálogo</p>
            <ul className="mt-4 space-y-2.5 text-sm text-creme/80">
              <li>
                <Link href="/catalogo" className="hover:text-creme">
                  Todas as peças
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=brincos"
                  className="hover:text-creme"
                >
                  Brincos
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?categoria=pulseiras"
                  className="hover:text-creme"
                >
                  Pulseiras
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?material=prata925"
                  className="hover:text-creme"
                >
                  Prata 925
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-creme">
                  Sobre a loja
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-champanhe">Atendimento</p>
            <ul className="mt-4 space-y-2.5 text-sm text-creme/80">
              <li>
                <a
                  href={linkGeral()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-creme"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-creme"
                >
                  @{site.instagram}
                </a>
              </li>
              <li>{site.horario}</li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-champanhe">Onde estamos</p>
            <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-creme/80">
              {site.atendimento}. O endereço a gente passa no WhatsApp quando
              você marcar.
            </p>
            <p className="mt-4 text-sm text-creme/60">
              Revenda autorizada Cristali e Montesanto.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[rgba(200,162,74,0.28)] pt-6 text-xs text-creme/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nome} — {site.cidade}/
            {site.estado}
          </p>
          <p className="font-display text-sm text-champanhe/80">
            Venha ArraZaaaa com a gente.
          </p>
        </div>
      </div>
    </footer>
  );
}
