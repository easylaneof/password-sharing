export type GenerationResponse = {
  id: string;
  message: string;
};

export type GenerationResult = GenerationResponse | { id: string; publicKey: string };
