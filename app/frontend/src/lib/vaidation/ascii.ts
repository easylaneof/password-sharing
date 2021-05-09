// eslint-disable-next-line no-control-regex
const re = /^[\x00-\x7F]*$/;

export const validateAscii = (str: string) => {
  const result = re.test(str);

  if (!result) {
    return 'Only ASCII symbols passwords are supported';
  }

  return true;
};
