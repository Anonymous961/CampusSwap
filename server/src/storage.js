const multer=require('multer');
const path=require('path');
const {v4:uuidv4}=require("uuid");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/images");
    },
    filename:function(req,file,cb){
        cb(null,uuidv4()+'-'+Date.now()+path.extname(file.originalname));
    }
})

const fileFilter=(req,file,cb)=>{
    const allowedFileTypes=['image/jpeg','image/png','image/jpg'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

module.exports={storage,fileFilter};