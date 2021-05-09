export type EncryptionParams = {
  password: string;
  id: string;
  max_uses: number;
  expiry_hours: number;
  expiry_minutes: number;
};

export type EncryptionResponse = {
  message: string;
  secret: string;
  id: string;
};
