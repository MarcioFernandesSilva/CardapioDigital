// Regex para validações
const NOME_REGEX = /^[a-zA-Z\sà-úÀ-Ú'.-]{2,100}$/;
const TELEFONE_REGEX = /^\d{10,15}$/;
const ENDERECO_REGEX = /^[a-zA-Z0-9\sà-úÀ-Ú'.,_/#-]{5,200}$/;

// Limites de tamanho para evitar DoS por dados excessivos
const MAX_NOME_LENGTH = 100;
const MAX_TELEFONE_LENGTH = 15;
const MAX_ENDERECO_LENGTH = 200;

export const sanitizeName = (name: string): string => {
  if (name.length > MAX_NOME_LENGTH) {
    throw new Error('Nome excede o comprimento máximo.');
  }
  if (!NOME_REGEX.test(name)) {
    throw new Error('Nome contém caracteres inválidos.');
  }
  return name.trim();
};

export const sanitizePhone = (phone: string): string => {
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length > MAX_TELEFONE_LENGTH) {
        throw new Error('Telefone excede o comprimento máximo.');
    }
    if (!TELEFONE_REGEX.test(cleanedPhone)) {
        throw new Error('Telefone contém caracteres inválidos.');
    }
    return cleanedPhone;
};

export const sanitizeAddress = (address: string): string => {
  if (address.length > MAX_ENDERECO_LENGTH) {
    throw new Error('Endereço excede o comprimento máximo.');
  }
  if (!ENDERECO_REGEX.test(address)) {
    throw new Error('Endereço contém caracteres inválidos.');
  }
  return address.trim();
}; 