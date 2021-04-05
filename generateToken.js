function generateToken() {
  const ZERO_CHAR_CODE = 48;
  const LOW_Z_CHAR_CODE = 122;
  const CHAR_CODE_INTERVAL = LOW_Z_CHAR_CODE - ZERO_CHAR_CODE;
  const TOKEN_LENGTH = 16;
  let TOKEN = '';

  for (let i = 0; i < TOKEN_LENGTH; i += 1) {
    const randomCharCode = String.fromCharCode(
      Math.ceil((Math.random() * CHAR_CODE_INTERVAL) + ZERO_CHAR_CODE),
    );
    TOKEN += randomCharCode;
  }
  return { token: TOKEN };
}

module.exports = generateToken;
