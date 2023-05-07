const{Sequelize,DataTypes,Model}=require('sequelize');
const sequelize=require('../config/database');

class FeesCollection extends Model{

}

FeesCollection.init({
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
    collectionAmount:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    pendingAmount:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    collectionDate:{
        type:DataTypes.DATEONLY
    },
    isDeleted:{
        type:DataTypes.ENUM('N','Y'),
        defaultValue:'N'
    }
},
{
    sequelize,
    modelName:'FeesCollection',
    tableName:'sunrise_feesCollection',    
    timestamps:true
})
module.exports=FeesCollection;