const EMAIL = /^\S+@\S+\.\S+$/;
const MIN_PHONE_DIGITS = 7;

const toString = (value) =>
  typeof value === 'string' ? value : value == null ? '' : String(value);

export const isEmail = (value) => {
  const text = toString(value).trim();
  return EMAIL.test(text);
};

export const isPhone = (value) => {
  const digits = toString(value).replace(/\D/g, '');
  return digits.length >= MIN_PHONE_DIGITS;
};

/**
 * Returns an object where true means "this field is invalid".
 * Required: name, email, message. Phone is optional but must look like a phone number if filled.
 * Subject is optional.
 */
export function validateProject({ name = '', email = '', phone = '', message = '' } = {}) {
  const sanitizedName = toString(name);
  const sanitizedEmail = toString(email);
  const sanitizedPhone = toString(phone);
  const sanitizedMessage = toString(message);

  return {
    name: !sanitizedName.trim(),
    email: !isEmail(sanitizedEmail),
    phone: sanitizedPhone.trim() !== '' && !isPhone(sanitizedPhone),
    message: !sanitizedMessage.trim()
  };
}

export const hasErrors = (errors) => Object.values(errors ?? {}).some(Boolean);
