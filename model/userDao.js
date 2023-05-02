const { dataSource } = require('./dataSource');

const createUser = async (
  email,
  password,
  name,
  phoneNumber,
  adress,
  gender,
  birthDate,
  points
) => {
  try {
    return await dataSource.query(
      `
        INSERT INTO users (
            email,
            password,
            name,
            phone_number,
            adress,
            gender,
            birth_date,
            points
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?
        )
      `,
      [email, password, name, phoneNumber, adress, gender, birthDate, points]
    );
  } catch (err) {
    console.log(err);
    err = new Error(err.message);
    err.statusCode = 500;
    throw err;
  }
};

module.exports = {
  createUser,
};
