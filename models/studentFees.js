const{Sequelize,DataTypes,Model}=require('sequelize');
const sequelize=require('../config/database');
const Classes =require('./Classes');
class StudentFees extends Model{

}

StudentFees.init({
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
    academicYear:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    admissionFees:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    tutionFees:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    dressFees:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    bookFees:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    libraryFees:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    cabFees:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    other:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    total:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    paid:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    pending:{
        type:DataTypes.INTEGER,
        defaultValue:0
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
    modelName:'StudentFees',
    tableName:'sunrise_studentFees',    
    timestamps:true
})

  
  Classes.hasOne(StudentFees,{
    foreignKey: {
      name: 'classId'
    }
  });
module.exports=StudentFees;