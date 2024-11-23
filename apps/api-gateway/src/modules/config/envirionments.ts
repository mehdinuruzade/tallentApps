export const NODE_ENV = process.env.NODE_ENV;

type AppEnvironment = 'local' | 'ci' | 'test' | 'production';
export const APP_ENV: AppEnvironment = process.env.APP_ENV as AppEnvironment;
export const APP_NAME = process.env.APP_NAME;

export const ADDRESS = process.env.ADDRESS;
export const PORT = Number(process.env.PORT);
export const AUTH_MS_URL = process.env.AUTH_MS_URL;
export const USER_MS_URL = process.env.USER_MS_URL;
