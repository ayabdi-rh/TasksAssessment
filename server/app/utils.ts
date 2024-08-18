type EnvVariables = {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string
  };
  
  export function getEnv<T extends keyof EnvVariables>(key: T): EnvVariables[T] {
    const value = process.env[key];
  
    if (value === undefined) {
      throw new Error(`Environment variable ${key} is not set`);
    }
  
    switch (key) {
      case 'PORT':
        return parseInt(value, 10) as EnvVariables[T];
      case 'NODE_ENV':
        if (!['development', 'production', 'test'].includes(value)) {
          throw new Error(`Invalid NODE_ENV value: ${value}`);
        }
        return value as EnvVariables[T];
      default:
        return value as EnvVariables[T];
    }
  }