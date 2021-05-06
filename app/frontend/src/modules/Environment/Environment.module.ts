type EnvironmentType = 'development' | 'staging' | 'production';

const getEnv = (envName: string): string => {
  const envValue = process.env[envName];
  if (envValue) return envValue;
  throw new Error(`${envName} environment variable was not provided`);
};

export const Environment = {
  environment: getEnv('REACT_APP_ENVIRONMENT') as EnvironmentType,
  backendUrl: getEnv('REACT_APP_BACKEND_URL'),
};
