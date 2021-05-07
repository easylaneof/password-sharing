export const writeToClipboard = async (content: string) => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(content);
  }
};
