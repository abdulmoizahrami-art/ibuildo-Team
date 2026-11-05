export const FORM_ANCHOR = '#project-form';

/** wa.me link, or the form anchor while no number is configured. */
export function whatsappLink(number) {
  return number ? `https://wa.me/${number.replace(/\D/g, '')}` : FORM_ANCHOR;
}

/** tel: link, or the form anchor while no number is configured. */
export function phoneLink(number) {
  return number ? `tel:${number}` : FORM_ANCHOR;
}
