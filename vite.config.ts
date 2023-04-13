import { defineConfig, loadEnv } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import path, { resolve } from 'path';
import { wrapperEnv } from './compile/vite/utils';
import { createProxy } from './compile/vite/proxy';
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import Unocss from 'unocss/vite';
import DefineOptions from 'unplugin-vue-define-options/vite';
function resolvePath(path) {
  return resolve(__dirname, path);
}
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PROXY, VITE_PORT, VITE_PUBLIC_PATH } = viteEnv;

  console.log('mode=%s, root=%s, env=%s', mode, root, env);
  // console.log(createProxy(VITE_PROXY));
  // console.log(`代理配置为:以前缀为[${Object.keys(createProxy(VITE_PROXY))}}]开头的接口,将[/api]替换为[/api],并代理到：[http://ecaha.api.alarmtech.com.cn1]`)
  // const isBuild = command === 'build';
  return defineConfig({
    // 静态资源基础路径 base: './' || '',
    base: VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      legacy({ targets: ['chrome 52', 'chrome 53', 'not IE 11'] }),
      Unocss({
        /* options */
        presets: [presetUno(), presetAttributify(), presetIcons()],
      }),
      DefineOptions(),
    ],
    build: {
      outDir: 'build',
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks(id) {
            // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
            if (id.includes(path.resolve(__dirname, `/src/store/index.ts`))) {
              return 'vendor';
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      open: false,
      host: '0.0.0.0',
      port: VITE_PORT,
      strictPort: false,
      https: false,
      proxy: createProxy(VITE_PROXY),
    },
  });
};
