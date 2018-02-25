import bcrypt from 'bcrypt-nodejs';

/**
 * Creates a hash based on a given text-based password.
 * Currently has only one selection of salt 8.
 * @param password - Plaintext password
 * @returns {Promise<String>} - Promise to return a hash
 */
export const generateHash = password => new Promise((resolve, reject) => {
  bcrypt.genSalt(8, (err, salt) => {
    if (err) {
      reject(err);
    }
    bcrypt.hash(password, salt, null, (hashError, hash) => {
      if (hashError) {
        reject(hashError);
      }
      resolve(hash);
    });
  });
});

/**
 * Compares the plaintext password against the given hash.
 * @param password - Plaintext password
 * @param hash - Password hash
 * @returns {Promise<boolean>} - Whether hashes match
 */
export const compareHash = (password, hash) => new Promise((resolve, reject) => {
  bcrypt.compare(password, hash, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});
