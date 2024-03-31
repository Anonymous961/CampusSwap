const { DataTypes, Sequelize } = require("sequelize");
// const {Sequelize}=require("sequelize");
const sequelize=new Sequelize(process.env.DATABASE_URL);
// const { sequelize } = require("../sql_database/neonSeq");

const Item = sequelize.define(
  "Item",
  {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey:true
    },
    itemname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    condition: DataTypes.STRING,
    description: DataTypes.STRING,
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sold:DataTypes.BOOLEAN,
  },
  {
    timestamps: true,
    tableName: "items",
    createdAt: true,
  }
);

console.log("Item model check ",Item === sequelize.models.Item);
module.exports = Item;
