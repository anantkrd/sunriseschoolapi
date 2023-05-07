const{Sequelize,DataTypes,Model}=require('sequelize');
const sequelize=require('../config/database');

class StudentAttendance extends Model{

}

StudentAttendance.init({
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
    attendanceDate:{
        type:DataTypes.DATEONLY
    },
    status:{
        type:DataTypes.ENUM('present','absent'),
        defaultValue:'absent'
    },
    isDeleted:{
        type:DataTypes.ENUM('N','Y'),
        defaultValue:'N'
    }
},
{
    sequelize,
    modelName:'StudentAttendance',
    tableName:'sunrise_studentAttendance',    
    timestamps:true
})

module.exports=StudentAttendance;