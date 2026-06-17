import CryptoJS from "crypto-js";

const SECRET =
  import.meta.env.VITE_AES_SECRET;

export const encryptData = (
  value: string
) => {
  return CryptoJS.AES.encrypt(
    value,
    SECRET
  ).toString();
};

export const decryptData = (
  value: string
) => {
  try {
    if (
      !value.startsWith(
        "U2FsdGVkX1"
      )
    ) {
      return value;
    }

    const bytes =
      CryptoJS.AES.decrypt(
        value,
        SECRET
      );

    const decrypted =
      bytes.toString(
        CryptoJS.enc.Utf8
      );

    return decrypted || value;
  } catch {
    return value;
  }
};