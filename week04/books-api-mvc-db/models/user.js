const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Users {
  constructor(id, username, email) {
    this.id = id;
    this.username = username;
    this.email = email;
  }

  static async searchUsers(searchTerm) {
    const connection = await sql.connect(dbConfig);

    try {
      const query = `
        SELECT *
        FROM Users
        WHERE username LIKE '%${searchTerm}%'
          OR email LIKE '%${searchTerm}%'
      `;

      const result = await connection.request().query(query);
      return result.recordset;
    } catch (error) {
      throw new Error("Error searching users");
    } finally {
      await connection.close();
    }
  }

  // Create User
  static async createUser(user) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `INSERT INTO Users (username, email) VALUES (@username, @email); SELECT SCOPE_IDENTITY() AS id`;

    const request = connection.request();
    request.input("username", user.username);
    request.input("email", user.email);
    const result = await request.query(sqlQuery);

    await connection.close();

    return new Users(result.recordset[0].id, user.username, user.email);
  }

  // Get All Users
  static async getAllUsers() {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM Users`;
    const request = connection.request();
    const result = await request.query(sqlQuery);

    await connection.close();

    return result.recordset.map(
      (row) => new Users(row.id, row.username, row.email)
    );
  }

  // Get User by ID
  static async getUserById(id) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM Users WHERE id = @id`;

    const request = connection.request();
    request.input("id", id);
    const result = await request.query(sqlQuery);

    await connection.close();

    return result.recordset[0]
      ? new Users(result.recordset[0].id, result.recordset[0].username, result.recordset[0].email)
      : null;
  }

  // Update User
  static async updateUser(id, updatedUser) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `UPDATE Users SET username = @username, email = @email WHERE id = @id`;

    const request = connection.request();
    request.input("id", id);
    request.input("username", updatedUser.username || null);
    request.input("email", updatedUser.email || null);

    await request.query(sqlQuery);

    await connection.close();

    return this.getUserById(id);
  }

  // Delete User
  static async deleteUser(id) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `DELETE FROM Users WHERE id = @id`;

    const request = connection.request();
    request.input("id", id);
    const result = await request.query(sqlQuery);

    await connection.close();

    return result.rowsAffected > 0;
  }
}

module.exports = Users;
