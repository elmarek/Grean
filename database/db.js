const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("grean", "mareks", "miradb", {
  dialect: "postgres",
});

// creating models for tables in sequelize
const Users = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

const Projects = sequelize.define(
  "projects",
  {
    name: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    lat: {
      type: DataTypes.DECIMAL(8, 6),
      allowNull: false,
    },
    lng: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    owner: {
      type: DataTypes.STRING,
    },
    clean_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: false }
);

module.exports = { Users, Projects, sequelize };
