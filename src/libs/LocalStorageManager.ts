import { getAccountId } from './cookie';

const generateKey = (key: string) => {
  const myAccountId = getAccountId();
  return `${myAccountId}::${key}`;
};

export const loadLocalStorage = (key: string, oldValueCheck = true) => {
  if (oldValueCheck) {
    const oldData = localStorage.getItem(key);
    if (oldData) {
      saveLocalStorage(key, oldData);
      localStorage.removeItem(key);
    }
  }

  const result = localStorage.getItem(generateKey(key));
  return result;
};

export const saveLocalStorage = (key: string, data: string) => {
  localStorage.setItem(generateKey(key), data);
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(generateKey(key));
};
