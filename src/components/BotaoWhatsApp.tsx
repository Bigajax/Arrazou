import IconeWhatsApp from "@/components/IconeWhatsApp";
import { BOTAO, BOTAO_BASE, type VarianteBotao } from "@/lib/botao";

/**
 * Todo caminho para o WhatsApp passa por aqui. O texto do botão diz o que vai
 * acontecer — nunca "saiba mais".
 */
export default function BotaoWhatsApp({
  href,
  children = "Pedir no WhatsApp",
  variante = "primario",
  className = "",
}: {
  href: string;
  children?: React.ReactNode;
  variante?: VarianteBotao;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BOTAO_BASE} ${BOTAO[variante]} ${className}`}
    >
      <IconeWhatsApp className="h-[18px] w-[18px]" />
      {children}
    </a>
  );
}
