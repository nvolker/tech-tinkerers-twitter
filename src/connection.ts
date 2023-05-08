import mysql from "mysql2/promise";

let connection: mysql.Connection;

export const getConnection = async () => {
  if (connection) return connection;

  connection = await mysql.createConnection(process.env.DATABASE_URL as string);
  return connection;
};
