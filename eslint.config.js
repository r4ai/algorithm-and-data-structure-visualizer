import antfu from "@antfu/eslint-config"
import tailwind from "eslint-plugin-tailwindcss"

export default antfu(
  {
    react: true,
    stylistic: {
      indent: 2,
      quotes: "double",
    },
    typescript: true,
    ignores: ["node_modules/**", "dist/**", "src/routeTree.gen.ts"],
  },
  ...tailwind.configs["flat/recommended"],
)
