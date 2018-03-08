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

/**
* Fetches a list of all students and formats the data
* to match the structure of the frontend component.
* @return Promise<List<Student>>
*/
export const fetchUserTemperatures = () => (
  new Promise((resolve, reject) => {
    Student.find({}).select('username name temperatures')
      .slice('temperatures', 1).exec((err, students) => {
        if (err) return reject(err);
        const mappedStudents = students.map(student => ({
          id: student._id,
          nric: student.username,
          name: student.name,
          lastUpdated: student.temperatures[0].getTime(),
        }));
        return resolve(mappedStudents);
      });
  })
);
