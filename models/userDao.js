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
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [user] = await dataSource.query(
      `
      SELECT
        id, 
        email,
        password,
        name,
        phone_number,
        address,
        gender,
        birth_date,
        points
      FROM users
      WHERE email = ? 
        `,
      [email]
    );
    return user;
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
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
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const [user] = await dataSource.query(
      `
      SELECT 
      id, 
        email,
        password,
        name,
        phone_number,
        address,
        gender,
        birth_date,
        points
        FROM users
        WHERE id = ? 
        `,
      [id]
    );
    return user;
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const modifyInformation = async (
  userId,
  hashedPassword,
  phoneNumber,
  address
) => {
  try {
    const result = await dataSource.query(
      `UPDATE users
        SET password = ?,
        phone_number = ?,
        address = ?
      WHERE id = ?
      `,
      [hashedPassword, phoneNumber, address, userId]
    );

    if (!result.affectedRows) return result.affectedRows;

    const [user] = await dataSource.query(
      `SELECT
        phone_number,
        address
      FROM users
      WHERE id = ?`,
      [userId]
    );
    return user;
  } catch (error) {
    error = new Error('INVALID DATA');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  isExistedUser,
  getUserById,
  modifyInformation,
};
