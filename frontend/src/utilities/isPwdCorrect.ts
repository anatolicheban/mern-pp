export function isPwdCorrect(pwd: string): { isValid: true } | { isValid: false; message: string } {
  if (pwd.length < 12) {
    return {
      isValid: false,
      message: "Пароль занадто короткий",
    };
  }
  if (pwd.length > 24) {
    return {
      isValid: false,
      message: "Пароль занадто короткий",
    };
  }
  if (!/^[a-zA-Z0-9]+$/.test(pwd)) {
    return {
      isValid: false,
      message: "Пароль не має містити кириллиці або спец. символів",
    };
  }
  return {
    isValid: true,
  };
}
