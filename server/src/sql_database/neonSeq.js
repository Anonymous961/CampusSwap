require("dotenv").config()
const {Sequelize}=require("sequelize");
const db_url=process.env.DATABASE_URL;
const sequelize=new Sequelize(db_url);
// const User=require("../models/user.sql")
const Item=require("../models/item.sql")


const connectSQL=async()=>{
    try {
      //authenticationg with the database
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        //Syncing User and Item model with the database
        // await User.sync({alter:true});
        await Item.sync({alter:true});
        console.log("User and Items tables created!")
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports={connectSQL,sequelize};