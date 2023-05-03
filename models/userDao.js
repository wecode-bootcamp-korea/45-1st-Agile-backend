const { dataSource } = require('./dataSource');

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

module.exports = {
  getUserByEmail,
};
