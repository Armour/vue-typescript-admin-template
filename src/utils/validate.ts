export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0;

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path);

export const validateLowerCase = (str: string) => /^[a-z]+$/.test(str);

export const validateUpperCase = (str: string) => /^[A-Z]+$/.test(str);

export const validatAlphabets = (str: string) => /^[A-Za-z]+$/.test(str);
