interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_BASE_API: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
