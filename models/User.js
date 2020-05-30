const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create user model
class User extends Model {
  //set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compare(loginPw, this.password);
  }
}

// define table colums and configs
User.init(
  {
    // define id column
    id: {
      // use special Sequelize Datatypes object provie what type of data it is
      type: DataTypes.INTEGER,
      // thbis is equivalent of sqls not null option
      allowNull: false,
      // instruct that this is primary key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },
    // define username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // define email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // don't allow duplicate emails
      unique: true,
      // if allowNull is set to false, we can run our data through validator before creating tables
      validate: {
        isEmail: true
      }
    },
    // define password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // means password must be at least four char long
        len: [4]
      }
    }
  },
  { 
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // set up beforeUpdate lifecycle hook functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    // table config options go here
    // pass in our imported sequelize connection (the direct connecvtion to our database)
    sequelize,
    // don't auto create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of db table
    freezeTableName: true,
    // use underscores instead of camel case
    underscored: true,
    // make model stay lowercase in db
    modelName: 'user'
  }
);

module.exports = User;