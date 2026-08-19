// Os botões do site vivem aqui — em três telas eles já tinham nascido
// separados e começado a divergir em altura e canto. Quem precisa de <a> ou
// <Link> monta `${BOTAO_BASE} ${BOTAO[variante]}`.

export type VarianteBotao = "primario" | "secundario" | "contorno" | "claro";

/** Altura fixa, canto de etiqueta, sem sombra. */
export const BOTAO_BASE =
  "inline-flex h-[52px] items-center justify-center gap-3 rounded-[2px] px-6 text-sm tracking-wide transition-colors duration-200";

export const BOTAO: Record<VarianteBotao, string> = {
  // Ouro cheio: a ação principal da tela. Só uma por tela.
  primario:
    "border border-ouro bg-ouro font-medium text-vinho hover:bg-champanhe",
  secundario:
    "border border-vinho bg-vinho font-normal text-creme hover:bg-vinho-claro",
  contorno:
    "border border-[var(--fio-ouro)] font-normal text-tinta hover:bg-creme",
  // Sobre o vinho escuro: só o fio creme, até o hover encher o botão.
  claro:
    "border border-[rgba(242,229,197,0.4)] font-normal text-creme hover:border-creme hover:bg-creme hover:text-vinho",
};
