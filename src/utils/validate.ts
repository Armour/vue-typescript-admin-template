export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0;

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path);
