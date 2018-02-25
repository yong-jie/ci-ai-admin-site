import bcrypt from 'bcrypt-nodejs';

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


export const compareHash = (password, hash) => new Promise((resolve, reject) => {
  bcrypt.compare(password, hash, (err, res) => {
    if (err) reject(err);
    resolve(res);
  });
});
