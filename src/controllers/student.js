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
      .slice('temperatures', -1).exec((err, students) => {
        if (err) return reject(err);
        const mappedStudents = students.map(student => {
          const length = student.temperatures.length;
          const hasTemperatures = length > 0;
          let toBeReturned = {
            id: student._id,
            nric: student.username,
            name: student.name,
            lastUpdated: hasTemperatures > 0 ?
              student.temperatures[length - 1].time.getTime() : 0,
          };
          if (hasTemperatures) {
            toBeReturned.temperature = student.temperatures[length - 1].value;
          }
          return toBeReturned;
        });
        return resolve(mappedStudents);
      });
  })
);

/**
 * Adds the given temperature taking to a student.
 * @param username - The NRIC of the student
 * @param value - The temperature
 * @return Promise<Student>
 */
export const addTemperature = (username, value) => (
  new Promise((resolve, reject) => {
    Student.findOneAndUpdate({ username }, {
      $push: {
        temperatures: { value, time: Date.now() },
      },
    }, (err, student) => {
      if (err) return reject(err);
      if (student == null) return reject();
      return resolve(student);
    });
  })
);
