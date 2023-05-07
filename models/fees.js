const{Sequelize,DataTypes,Model}=require('sequelize');
const sequelize=require('../config/database');
const Classes =require('./Classes');
class Fees extends Model{

}

Fees.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    classId:{
        type:DataTypes.INTEGER,
        defaultValue:0
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
    modelName:'Fees',
    tableName:'sunrise_fees',    
    timestamps:true
})

Fees.belongsTo(Classes,{
    foreignKey: {
      name: 'classId'
    }
  });
module.exports=Fees;