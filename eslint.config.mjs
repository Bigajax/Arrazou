import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Regra inegociável do projeto: os dados só entram pela camada de catálogo.
  // Assim, quando a v2 trocar o arquivo local por Supabase, nenhuma tela muda.
  // A trava de verdade é o `import "server-only"` dentro de lib/catalogo.ts;
  // esta regra é o aviso amigável antes do build quebrar.
  {
    files: ["src/components/**", "src/app/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/data/produtos",
              message:
                "Use @/lib/catalogo. Nenhum componente ou página importa produtos.ts direto.",
            },
          ],
        },
      ],
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "scripts/**",
    "_raw-ig/**",
  ]),
]);

export default eslintConfig;
