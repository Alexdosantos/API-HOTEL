import bcrypt from 'bcrypt';

class Crypto {
  static encrypt(text) {
    return bcrypt.hashSync(text, 8);
  }

  static compare(text, hashedText) {
    return bcrypt.compareSync(text, hashedText);
  }
}

export { Crypto };
