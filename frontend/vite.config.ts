import { type ConfigEnv, type UserConfigExport, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import stylelint from "vite-plugin-stylelint";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd());

  const { VITE_PUBLIC_PATH } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,
    // server: {
    //   strictPort: false,
    //   open: "/",
    //   port: 5174,
    // },
    define: {
      global: {},
    },
    plugins: [
      react(),
      tsconfigPaths(),
      stylelint({
        fix: true,
        lintInWorker: true,
      }),
    ],

    css: {
      preprocessorOptions: {
        less: {
          math: "always",
          relativeUrls: true,
          javascriptEnabled: true,
        },
      },
    },
  };
};
