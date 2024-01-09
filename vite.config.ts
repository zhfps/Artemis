import { rmSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import { notBundle } from 'vite-plugin-electron/plugin'
import pkg from './package.json'
import { resolve } from 'node:path'
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync('dist-electron', { recursive: true, force: true })

  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG
  return {
        define:{
          __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
        },
        /** 打包时根据实际情况修改 base */
        base: './',
        resolve: {
          alias: {
            /** @ 符号指向 src 目录 */
            '@': resolve(__dirname, './src')
          }
        },
        server: {
          /** 是否开启 HTTPS */
          https: false,
          /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
          host: true, // host: "0.0.0.0"
          /** 端口号 */
          port: 3000,
          /** 是否自动打开浏览器 */
          open: false,
          /** 跨域设置允许 */
          cors: false,
          /** 端口被占用时，是否直接退出 */
          strictPort: false,
          /** 接口代理 */
          proxy: {
            // 测试环境
            '/dev': {
              target: 'https://orgf4fa1979.crm5.dynamics.com',
              // target: 'https://orgb98b7aba.crm5.dynamics.com',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/dev/, '')
            },
          }
        },
    plugins: [
      vue(),     
      electron([
        {
          // Main process entry file of the Electron App.
          entry: 'electron/main/index.ts',
          onstart({ startup }) {
            if (process.env.VSCODE_DEBUG) {
              console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App')
            } else {
              startup()
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'dist-electron/main',
              assetsDir: './',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
            plugins: [
              isServe && notBundle(),
            ],
          },
        },
        {
          entry: 'electron/preload/index.ts',
          onstart({ reload }) {
            reload()
          },
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined, // #332
              minify: isBuild,
              outDir: 'dist-electron/preload',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
            plugins: [
              isServe && notBundle(),
            ],
          },
        }
      ]),
      // Use Node.js API in the Renderer process
      renderer(),
    ],
    clearScreen: false,
  }
})
