//--- Importing classes and packages---//
const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection'); // connecting to mySQL using environment variables

//--- User Model ---//
class User extends Model {
    checkPassword(loginPw) {
        //-- verifying that the password passed in the argument matches the user's hashed password --//
        return bcrypt.compareSync(loginPw, this.password);
    }
};

//--- Properties and Data Types ---//
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, //
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {   
        hooks: {
            //-- Lifecycle hooks --//
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }

        },

        //-- Behaviour of the model --//
        sequelize,
        timestamps: false,
        freezeTableName: true, //
        underscored: true,
        modelName: 'user'

    }
);


module.exports = User;

