export type DecryptParams = {
  secret: string;
  id: string;
};

export type DecryptResponse = {
  message: string;
  password: string;
};
