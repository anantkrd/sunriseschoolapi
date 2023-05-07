const{Sequelize,DataTypes,Model}=require('sequelize');
const sequelize=require('../config/database');

class Classes extends Model{

}

Classes.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    className:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    status:{
        type:DataTypes.ENUM('active','inactive'),
        defaultValue:'active'
    },
    isDeleted:{
        type:DataTypes.ENUM('N','Y'),
        defaultValue:'N'
    }
},
{
    sequelize,
    modelName:'Classes',
    tableName:'sunrise_class',    
    timestamps:true
})
module.exports=Classes;