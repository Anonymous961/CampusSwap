const express = require("express");
const ItemModel = require("../models/item.sql");
const { v4: uuidv4 } = require("uuid");
const { fileFilter, storage } = require("../storage");
const router = express.Router();
const multer = require("multer");
const {User:UserMongo} = require("../models/userModel");
let upload = multer({ storage, fileFilter });
const requireAuth = require("../middlewares/requireAuth");
const getUserId = require("../utils/getUserId");

//get all items
router.get("/allitems", async (req, res) => {
  try {
    const items = await ItemModel.findAll({order:[['createdAt','DESC']]});
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

//get an item by id
router.get("/allitems/:itemId", async (req, res) => {
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
});

//get an item by name
router.get("/itemname/:itemname", async (req, res) => {
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
});

// auth check
router.use(requireAuth);

//add an item
router.post("/additem", upload.single("photo"), async (req, res) => {
  const { name, description, condition, price, sold } = req.body;
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
  };
  console.log(newItemData);
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
});

//delete an item
router.delete("/deleteitem/:id", async (req, res) => {
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
    res.json("Item deleted successfully!!");
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
});

//get all user item
router.get("/userItem", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const ownerId = getUserId(authorization);
    const itemList = (await ItemModel.findAll({ where: { ownerId }, order: [['createdAt','DESC']] }))
    res.json({ itemList });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
});

//update an item
router.patch("/updateitem/:id", upload.single("photo"), (req, res) => {
  // const {name, description, condition,price, ownerId}=req.body;
  // console.log(req.file)
  // const photo=req.file.filename;
  // const id=uuidv4();
  // // console.log(req.user);
  // const newItemData={
  //     id,itemname:name, description,price,condition, ownerId, image:photo
  // }
  // try {
  //     const item= await ItemModel.create(newItemData);
  //     //will be used after user authentication
  //     // add itemid to user data file
  //     const addtouser= await UserMongo.findOneAndUpdate({username:req.user.username},{
  //         "$push":{
  //             itemListId:item.id
  //         }
  //     })
  //     res.json(item);
  // } catch (err) {
  //     console.error(err.message)
  //     res.status(400).json({error:err.message})
  // }
});

module.exports = router;
