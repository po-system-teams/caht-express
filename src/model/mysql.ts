import { Sequelize } from "sequelize";

export default function consturctMySql() {
  const { sqlconfig } = require("../config");
  const sequelize = new Sequelize(
    sqlconfig.database,
    sqlconfig.user,
    sqlconfig.password,
    {
      host: sqlconfig.host,
      port: sqlconfig.port,
      dialect: "mysql",
    }
  );

  try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  return sequelize;
}
