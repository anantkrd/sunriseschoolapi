const { createPool } = require('mysql');
const Sequelize=require('sequelize');
const sequelize=new Sequelize(process.env.MYSQL_DB,process.env.DB_USER,process.env.DB_PASS,{dialect:'mysql',host:process.env.HOST});
try{
    sequelize.sync();
}catch(e){
    console.log("Error in database connection Sync")
}


module.exports=sequelize;

/*
const pool=createPool({
    user:process.env.DB_USER,
    host:process.env.HOST,
    database:process.env.MYSQL_DB,
    password:process.env.DB_PASS,
    connectionLimit:10
});
module.exports=pool;*/
