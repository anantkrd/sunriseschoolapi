const{Sequelize,DataTypes,Model}=require('sequelize');
const sequelize=require('../config/database');

class examDetails extends Model{

}

examDetails.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    classId:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    studentId:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    examId:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    subject:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    totalMark:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    passingMark:{
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
    modelName:'examDetails',
    tableName:'sunrise_exams_details',    
    timestamps:true
})
module.exports=examDetails;