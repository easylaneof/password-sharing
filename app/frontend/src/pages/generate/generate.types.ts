export type GenerationResponse = {
  id: string;
  message: string;
};

export type GenerationResult = GenerationResponse | { id: string; publicKey: string };

export type SendMailParams = { link: string; mail: string };

export type SendMailResult = { message: string };
