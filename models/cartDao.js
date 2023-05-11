const { subscribeCycleEnum } = require('../models/orderDao');
const { dataSource } = require('./dataSource');

const createCart = async (
  userId,
  bookId,
  amount,
  isSubscribe,
  subscribeCycle
) => {
  try {
    const result = await dataSource.query(
      `
        INSERT INTO carts (
            user_id,
            book_id,
            amount,
            is_subscribe,
            subscribe_cycle_id
        ) VALUES (
          ?, ?, ?, ?, ?
        )
      `,
      [userId, bookId, amount, isSubscribe, subscribeCycleEnum[subscribeCycle]]
    );
    const [cart] = await dataSource.query(
      `SELECT DISTINCT
        b.id bookId,
        b.title,
        b.thumbnail,
        b.price,
        b.is_subscribe isSubscribe,
        (SELECT sc.delivery_cycle FROM subscribe_cycle sc WHERE sc.id = c.subscribe_cycle_id) subscribeCycle,
        c.amount
      FROM carts c
      JOIN books b ON b.id = c.book_id
      WHERE c.id = ?
        `,
      [result.insertId]
    );

    return cart;
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const checkCart = async (userId, bookId) => {
  try {
    const [result] = await dataSource.query(
      `
        SELECT EXISTS (
          SELECT
          id
          FROM carts 
          WHERE user_id = ? AND book_id = ?
      ) isLiked
      `,
      [userId, bookId]
    );
    return !!parseInt(result.isLiked);
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const getCartsById = async (cartIds) => {
  try {
    const carts = await dataSource.query(
      `
        SELECT
          c.id,
          c.amount,
          c.user_id userId,
          c.book_id bookId,
          b.price,
          c.is_subscribe isSubscribe
        FROM carts c
        JOIN books b on b.id = c.book_id
        WHERE c.id IN (?)
      `,
      [cartIds]
    );

    return carts;
  } catch (error) {
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const getCarts = async (userId) => {
  try {
    return dataSource.query(
      `SELECT DISTINCT
        b.id bookId,
        c.id cartId,
        b.title,
        b.thumbnail,
        b.price,
        b.is_subscribe isSubscribe,
        (SELECT sc.delivery_cycle FROM subscribe_cycle sc WHERE sc.id = c.subscribe_cycle_id) subscribeCycle,
        c.amount
      FROM carts c
      JOIN books b ON b.id = c.book_id
      WHERE c.user_id = ?
        `,
      [userId]
    );
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
};

const modifyQuantity = async (userId, cartId, amount) => {
  try {
    const result = await dataSource.query(
      `UPDATE carts
      SET amount = ?
      WHERE user_id = ? AND id = ?`,
      [amount, userId, cartId]
    );

    if (!result.affectedRows) return result.affectedRows;

    const [cart] = await dataSource.query(
      `SELECT DISTINCT
        b.id bookId,
        b.title,
        b.thumbnail,
        b.price,
        b.is_subscribe isSubscribe,
        c.amount
      FROM carts c
      JOIN books b ON b.id = c.book_id
      WHERE c.id = ?
        `,
      [cartId]
    );

    return cart;
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
};

const deleteBooks = async (userId, cartId) => {
  try {
    const result = await dataSource.query(
      `DELETE
      FROM carts
      WHERE user_id = ? AND id IN (?);
    `,
      [userId, cartId]
    );

    if (!result.affectedRows) return result.affectedRows;

    return result;
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
};

const addExistBook = async (userId, bookId, amount) => {
  try {
    const result = await dataSource.query(
      `UPDATE carts
        SET amount = amount + ?
        WHERE user_id = ? AND book_id = ?`,
      [amount, userId, bookId]
    );

    if (!result.affectedRows) return result.affectedRows;

    const [cart] = await dataSource.query(
      `SELECT 
        id,
        amount
      FROM carts
      WHERE user_id = ? AND book_id = ?`,
      [userId, bookId]
    );

    return cart;
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createCart,
  checkCart,
  getCartsById,
  getCarts,
  modifyQuantity,
  deleteBooks,
  addExistBook,
};
