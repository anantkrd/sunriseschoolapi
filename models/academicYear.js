const{Sequelize,DataTypes,Model}=require('sequelize');
const sequelize=require('../config/database');

class academicYear extends Model{

}

academicYear.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    academicYear:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    status:{
        type:DataTypes.ENUM('active','inactive'),
        defaultValue:'inactive'
    },
    isDeleted:{
        type:DataTypes.ENUM('N','Y'),
        defaultValue:'N'
    }
},
{
    sequelize,
    modelName:'academicYear',
    tableName:'sunrise_academicYear',    
    timestamps:true
})
module.exports=academicYear;