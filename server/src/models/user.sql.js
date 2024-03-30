const {DataTypes, Sequelize}=require("sequelize");
const {sequelize}=require("../sql_database/neonSeq");

const User=sequelize.define('User',{
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:true,
    tableName:'users',
    createdAt:true
})

console.log("User model check ",User===sequelize.models.User);
module.exports=User;