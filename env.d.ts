/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_OTHER_API_KEY: string
  // dodaj więcej jak potrzeba
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
