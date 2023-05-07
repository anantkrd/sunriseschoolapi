const{Sequelize,DataTypes,Model}=require('sequelize');
const sequelize=require('../config/database');

class StaffAttendance extends Model{

}

StaffAttendance.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    staffId:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    attendanceDate:{
        type:DataTypes.DATEONLY
    },
    status:{
        type:DataTypes.ENUM('present','absent','paidLeave','sickLeave','leave','holiday'),
        defaultValue:'absent'
    },
    isDeleted:{
        type:DataTypes.ENUM('N','Y'),
        defaultValue:'N'
    }
},
{
    sequelize,
    modelName:'StaffAttendance',
    tableName:'sunrise_staffAttendance',    
    timestamps:true
})
module.exports=StaffAttendance;