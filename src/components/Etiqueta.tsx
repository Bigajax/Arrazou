import { formatarBRL } from "@/lib/formato";

/**
 * O elemento-assinatura do projeto.
 *
 * Nas fotos da loja cada peça chega pendurada numa cartela furada, com o preço
 * escrito à mão. Aqui a cartela virou componente: retângulo creme, fio
 * dourado, furo de verdade recortado à esquerda (máscara CSS, então a foto
 * aparece através dele). Dentro dela vai só o preço — e, quando a etiqueta
 * fala pelo catálogo inteiro, um rótulo curto antes dele.
 */
export default function Etiqueta({
  preco,
  precoPromocional,
  rotulo,
  className = "",
}: {
  preco: number;
  precoPromocional?: number;
  rotulo?: string;
  className?: string;
}) {
  const furo =
    "radial-gradient(circle 3.5px at 11px 50%, transparent 3.5px, #000 4px)";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-[2px] border border-[var(--fio-ouro)] bg-creme py-1.5 pr-2.5 pl-5 sm:pr-3 sm:pl-6 shadow-[0_1px_2px_rgba(58,0,12,0.14)] ${className}`}
      style={{ maskImage: furo, WebkitMaskImage: furo }}
    >
      {rotulo ? (
        <span className="text-[9.5px] leading-none tracking-[0.14em] text-tinta/55 uppercase">
          {rotulo}
        </span>
      ) : null}
      {precoPromocional ? (
        <>
          <span className="tabular text-[11px] font-light text-tinta-clara line-through">
            {formatarBRL(preco)}
          </span>
          <span className="tabular text-sm font-medium text-rubi">
            {formatarBRL(precoPromocional)}
          </span>
        </>
      ) : (
        <span className="tabular text-[13px] font-medium text-tinta sm:text-sm">
          {formatarBRL(preco)}
        </span>
      )}
    </span>
  );
}
