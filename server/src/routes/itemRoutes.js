const express = require("express");
const { fileFilter, storage } = require("../storage");
const router = express.Router();
const multer = require("multer");
let upload = multer({ storage, fileFilter });
const requireAuth = require("../middlewares/requireAuth");
const {
  getAllItems,
  getItemById,
  getItemByName,
  addItem,
  deleteItem,
  getUserItem,
} = require("../controllers/itemController");

//get all items
router.get("/allitems", getAllItems);

//get an item by id
router.get("/allitems/:itemId", getItemById);

//get an item by name
router.get("/itemname/:itemname", getItemByName);

// auth check
router.use(requireAuth);

//add an item
router.post("/additem", upload.single("photo"), addItem);

//delete an item
router.delete("/deleteitem/:id", deleteItem);

//get all user item
router.get("/userItem", getUserItem);

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
