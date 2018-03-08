import Student from '../models/student';

/**
 * Creates a student with the given username, name, gender and parents.
 * @param username
 * @param gender
 * @param name
 * @param parents - List of ObjectId's of users whose authorizations are
 * 'Parent'
 * @return Promise<User>
 */
export const createStudent = (username, gender, name, parents) =>
  new Promise(async (resolve, reject) => {
    const newStudent = new Student();
    newStudent.username = username.toUpperCase();
    newStudent.gender = gender;
    newStudent.name = name.toUpperCase();
    newStudent.childOf = parents;
    newStudent.save((err, student) => {
      if (err) {
        return reject(err);
      }
      return resolve(student);
    });
  });
