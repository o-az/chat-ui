interface EnvironmentVariables {
  readonly NODE_ENV: 'development' | 'production' | 'test'
  readonly OPENAI_API_KEY: string
  readonly OPENAI_MODEL: 'gpt-3.5-turbo' | 'gpt-4'
}

declare module NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}
