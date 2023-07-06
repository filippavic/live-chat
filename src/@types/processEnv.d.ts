declare namespace NodeJS {
    type ProcessEnv = {
        NODE_ENV: 'development' | 'production'
        PORT: string
        PG_USERNAME: string
        PG_PASSWORD: string
        PG_DATABASE: string
        PG_HOST: string
        PG_PORT: string
        JWT_TOKEN_SECRET: string
        JWT_EXPIRATION: string
    }
}
