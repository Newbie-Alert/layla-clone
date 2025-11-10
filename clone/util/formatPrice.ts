export const formatPrice = (value: string) => {
  const num = parseInt(value, 10);
  const eok = Math.floor(num / 10000);
  const man = num % 10000;
  if (eok > 0 && man > 0) return `${eok}억 ${man}만원`;
  if (eok > 0) return `${eok}억`;
  return `${man}만원`;
};
