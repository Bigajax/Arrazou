import Image from "next/image";
import Link from "next/link";
import Etiqueta from "@/components/Etiqueta";
import Moldura from "@/components/Moldura";
import SeloMaterial from "@/components/SeloMaterial";
import type { ProdutoResumo } from "@/lib/tipos";

export default function ProdutoCard({
  produto,
  prioridade = false,
}: {
  produto: ProdutoResumo;
  prioridade?: boolean;
}) {
  const esgotado = !produto.disponivel;

  return (
    <Link
      href={`/produto/${produto.slug}`}
      className="group block focus-visible:outline-2 focus-visible:outline-ouro focus-visible:outline-offset-4"
    >
      <div className="relative">
        <Moldura className="aspect-4/5 w-full">
          <Image
            src={produto.imagem}
            alt={produto.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            loading={prioridade ? "eager" : "lazy"}
            className={`object-cover transition-transform duration-300 group-hover:scale-[1.03] ${
              esgotado ? "opacity-60" : ""
            }`}
          />
        </Moldura>

        {esgotado && (
          <span className="absolute top-[13%] left-1/2 -translate-x-1/2 bg-rubi px-3 py-1 text-[11px] tracking-[0.18em] text-creme uppercase">
            Esgotado
          </span>
        )}

        <Etiqueta
          preco={produto.preco}
          precoPromocional={produto.precoPromocional}
          className="absolute bottom-[14%] left-1/2 -translate-x-1/2 transition-transform duration-200 group-hover:-translate-y-0.5 sm:bottom-[9%]"
        />
      </div>

      <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
        <h3 className="text-[15px] leading-snug font-normal text-tinta group-hover:text-vinho">
          {produto.nome}
        </h3>
        <SeloMaterial
          material={produto.material}
          className="shrink-0 text-tinta-clara"
        />
      </div>
    </Link>
  );
}
