const ItemModel = require("../models/item.sql");
const { v4: uuidv4 } = require("uuid");
const { User: UserMongo } = require("../models/userModel");
const getUserId = require("../utils/getUserId");

const getAllItems = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const offset = (page - 1) * limit;
  try {
    const totalItems = await ItemModel.count();
    const totalPages = Math.ceil(totalItems / limit)
    const items = await ItemModel.findAll({ order: [["createdAt", "DESC"]], offset, limit });

    res.json({ meta: { total: totalItems, page, pages: totalPages }, data: items });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

const getItemById = async (req, res) => {
  const { itemId } = req.params;
  try {
    const response = await ItemModel.findOne({ where: { id: itemId } });
    if (!response) {
      throw Error("Item does not exist!!");
    }
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

const getItemByName = async (req, res) => {
  const { itemname } = req.params;
  try {
    const response = await ItemModel.findAll({ where: { itemname: itemname } });
    if (!response) {
      throw Error("Item does not exist!!");
    }
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};
const addItem = async (req, res) => {
  const { name, description, condition, price, sold, ownerName, city } =
    req.body;
  const { authorization } = req.headers;
  const ownerId = getUserId(authorization);
  console.log(req.file);
  const photo = req.file.filename;
  const id = uuidv4();

  const newItemData = {
    id,
    itemname: name,
    description,
    price,
    condition,
    ownerId,
    sold,
    image: photo,
    ownerName,
    city,
  };
  // console.log(newItemData);
  try {
    const item = await ItemModel.create(newItemData);

    //will be used after user authentication

    // add itemid to user data file
    const addtouser = await UserMongo.findOneAndUpdate(
      { _id: ownerId },
      {
        $push: {
          itemListId: item.id,
        },
      }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const exist = await ItemModel.findOne({ where: { id: id } });

    if (!exist) {
      throw Error("Item already does not exists!!");
    }
    const response = await ItemModel.destroy({
      where: {
        id: id,
      },
    });
    console.log(response)
    res.json("Item deleted successfully!!");
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

const getUserItem = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  try {
    const { authorization } = req.headers;
    const ownerId = getUserId(authorization);
    const totalItems = await ItemModel.count({ where: { ownerId } });
    const totalPages = Math.ceil(totalItems / limit)
    const itemList = await ItemModel.findAll({
      where: { ownerId },
      order: [["createdAt", "DESC"]],
      offset, limit
    });
    res.json({ meta: { total: totalItems, page, pages: totalPages }, data: itemList });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  getItemByName,
  deleteItem,
  getUserItem,
  addItem,
};
