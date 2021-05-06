export type GenerationResponse = {
  id: string;
  message: string;
};

export type EncryptionParams = {
  password: string;
  id: string;
};

export type EncryptionResponse =
  | {
      message: 'OK';
      secret: string;
      id: string;
    }
  | { message: string };

export type DecryptParams = {
  secret: string;
  id: string;
};

export type DecryptResponse = {
  message: string;
  password: string;
};
