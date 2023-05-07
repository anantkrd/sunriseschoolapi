const{Sequelize,DataTypes,Model}=require('sequelize');
const sequelize=require('../config/database');

class Staff extends Model{

}

Staff.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    firstName:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    lastName:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    gender:{
        type:DataTypes.STRING,
        defaultValue:''
    },    
    type:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    mobileNo:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    staffPassword:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    email:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    address:{
        type:DataTypes.TEXT,
        defaultValue:''
    },
    education:{
        type:DataTypes.TEXT,
        defaultValue:''
    },
    experience:{
        type:DataTypes.TEXT,
        defaultValue:''
    },
    salary:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    joinDate:{
        type:DataTypes.DATEONLY
    },
    status:{
        type:DataTypes.ENUM('active','inactive','left'),
        defaultValue:'active'
    },
    isDeleted:{
        type:DataTypes.ENUM('N','Y'),
        defaultValue:'N'
    }
},
{
    sequelize,
    modelName:'Staff',
    tableName:'sunrise_staff',    
    timestamps:true
})
module.exports=Staff;