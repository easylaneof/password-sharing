export type EncryptionParams = {
  password: string;
  id: string;
};

export type EncryptionResponse = {
  message: string;
  secret: string;
  id: string;
};
