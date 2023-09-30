import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  // conseguir ler importações com arrobas
  plugins: [tsconfigPaths()],
})
