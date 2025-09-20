const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // adjust path as needed
const bcrypt = require("bcrypt");

User.beforeCreate(async (user, options) => {
  user.password = await bcrypt.hash(user.password, 10);
});


const User = sequelize.define("User", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  termsAccepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  tableName: "users"
});

module.exports = User;
