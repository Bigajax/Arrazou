/**
 * A placa de latão da vitrine.
 *
 * Não é uma faixa de promoção: é a ficha técnica da loja correndo devagar,
 * escrita com as palavras que a própria ArraZou usa nas artes do Instagram.
 * Passa o mouse e ela para, para dar tempo de ler.
 */
const CREDENCIAIS = [
  "Ouro 18k",
  "Prata 925",
  "Garantia no banho",
  "Hipoalergênico",
  "Zircônias e cristais",
  "Perfeito para presentear",
  "Pedido pelo WhatsApp",
];

function Fita({ oculta = false }: { oculta?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={oculta || undefined}
    >
      {CREDENCIAIS.map((c) => (
        <li key={c} className="flex items-center">
          <span className="eyebrow px-6 text-[10.5px] whitespace-nowrap md:text-[11px]">
            {c}
          </span>
          <span aria-hidden className="text-[9px] text-vinho/40">
            &#10022;
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function FaixaRotativa() {
  return (
    <div className="faixa relative overflow-hidden bg-ouro py-3 text-vinho">
      <div className="faixa-fita">
        <Fita />
        <Fita oculta />
      </div>
    </div>
  );
}
