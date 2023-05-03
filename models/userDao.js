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
    error = new Error(error.message);
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  getUserByEmail,
};
