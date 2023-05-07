const{Sequelize,DataTypes,Model}=require('sequelize');
const sequelize=require('../config/database');

class Exams extends Model{

}

Exams.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    classId:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    academicYear:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    studentId:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    title:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    totalMark:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    studentMark:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    status:{
        type:DataTypes.ENUM('pass','failed','absent'),
        defaultValue:'active'
    },
    isDeleted:{
        type:DataTypes.ENUM('N','Y'),
        defaultValue:'N'
    }
},
{
    sequelize,
    modelName:'Exams',
    tableName:'sunrise_exams',    
    timestamps:true
})
module.exports=Exams;