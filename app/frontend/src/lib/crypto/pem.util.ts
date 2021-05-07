export enum PemType {
  PRIVATE = 'RSA PRIVATE',
  PUBLIC = 'PUBLIC',
}

export const removeFirstAndLastLine = (pem: string) => {
  const lines = pem.split('\r\n');

  const result = [];

  for (let i = 1; i < lines.length - 2; i++) {
    result.push(lines[i]);
  }

  return result.join('\r\n');
};

export const addFirstAndLastLine = (pem: string, pemType: PemType) => {
  return `-----BEGIN ${pemType} KEY-----\r\n${pem}\r\n-----END ${pemType} KEY-----\r\n`;
};
