export function isPhone(phoneNumber) {
  const pattern = /^09[0-9]{9}$/;
  return pattern.test(phoneNumber);
}
