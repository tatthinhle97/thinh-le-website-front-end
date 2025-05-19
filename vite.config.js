import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), reactRouter(), tailwindcss()],
});
