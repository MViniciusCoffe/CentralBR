import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Evita que o Turbopack use /home/<user> como raiz por causa de um
    // package-lock.json fora do projeto.
    root: dirname(fileURLToPath(import.meta.url)),
  },
};

export default nextConfig;
