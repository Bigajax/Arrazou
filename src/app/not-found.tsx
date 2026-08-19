import Link from "next/link";

export default function NaoEncontrado() {
  return (
    <main className="mx-auto max-w-[1240px] px-5 py-24 md:px-8 md:py-32">
      <p className="eyebrow text-tinta-clara">Erro 404</p>
      <h1 className="mt-5 max-w-[20ch] font-display text-[34px] leading-tight text-vinho md:text-[48px]">
        Essa peça não está mais aqui.
      </h1>
      <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-tinta">
        Pode ter sido vendida ou trocado de endereço. Dá uma olhada no catálogo
        completo — provavelmente tem uma parecida.
      </p>
      <Link
        href="/catalogo"
        className="mt-8 inline-block rounded-[4px] bg-ouro px-6 py-3.5 text-sm font-medium text-vinho hover:bg-champanhe"
      >
        Ver catálogo
      </Link>
    </main>
  );
}
