const { dataSource } = require('./dataSource');

const createUser = async (
  email,
  password,
  name,
  phoneNumber,
  address,
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
            address,
            gender,
            birth_date,
            points
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?
        )
      `,
      [email, password, name, phoneNumber, address, gender, birthDate, points]
    );
  } catch (err) {
    console.log(err);
    err = new Error(err.message);
    err.statusCode = 500;
    throw err;
  }
};

const isExistedUser = async (email) => {
  try {
    const [result] = await dataSource.query(
      `
        SELECT EXISTS (
          SELECT
          id
          FROM users 
          WHERE email = ?
      ) idExists
      `,
      [email]
    );
    return !!parseInt(result.idExists);
  } catch (err) {
    console.log(err);
    err = new Error(err.message);
    err.statusCode = 500;
    throw err;
  }
};

module.exports = {
  createUser,
  isExistedUser,
};
