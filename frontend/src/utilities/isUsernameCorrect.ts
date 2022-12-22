export function isUsernameCorrect(
  pwd: string
): { isValid: true } | { isValid: false; message: string } {
  if (pwd.length < 8) {
    return {
      isValid: false,
      message: "Ім'я користувача занадто коротке",
    };
  }
  if (pwd.length > 20) {
    return {
      isValid: false,
      message: "Ім'я користувача занадто довге",
    };
  }
  if (!/^[a-zA-Z0-9]+$/.test(pwd)) {
    return {
      isValid: false,
      message: "Ім'я користувача не має містити кириллиці або спец. символів",
    };
  }
  return {
    isValid: true,
  };
}
