import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "./", // <- ESSENCIAL para Electron carregar os assets locais (CSS, JS)
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "chrome114", // Electron v36 usa Chrome 114
    rollupOptions: {
      output: {
        manualChunks: undefined, // Deixa o Vite decidir, ou customize se quiser
      },
    },
  },
}));
