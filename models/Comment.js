//----  Importing classes and packages ---//
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

//--- Comment Model ---//
class Comment extends Model { };

//--- Properties and Data Types ---//
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: { //TODO: comment_text = title, description
            type: DataTypes.STRING,
            
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'  
    }
);

module.exports = Comment;