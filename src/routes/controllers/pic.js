const path = require("path");
const {URL} = require('url');
const multer = require('multer');
const { NotFound } = require('../errors')
const { Image } = require('../../models');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploadImage')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.fieldname + '-' + file.originalname.slice(-20))
  }
})

// var createFolder = function(folder){
//   try{
//       // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
//       // 如果文件路径不存在将会抛出错误"no such file or directory"
//       fs.accessSync(folder); 
//   }catch(e){
//       // 文件夹不存在，以同步的方式创建文件目录。
//       fs.mkdirSync(folder);
//   }  
// };
 
let upload = multer({ storage: storage })

if(!upload){
  upload = { single:()=>(req,res,next)=>next()}
}


const fs =require('fs')
module.exports = {
  pic: {
    name: "/image",
    method: "post",
    middlewares:[
      upload.single('file')
    ],
    async handler(req, res, next) {
      try {
         if(req.file){
           let url = path.resolve(__dirname, '../../../',req.file.path);
           const image = await Image.create({url:url})
           res.json({urlID:image.id})
         }
      } catch (err) {
        next(err);
      }
    }
  },
  get:{
    name: "/image/:id",
    method: "get",
    async handler(req, res, next) {
      try {
        if(!req.params.id){
          throw new NotFound();
        }
        const img =  await Image.findById(parseInt(req.params.id));
        res.sendFile(img.url);
      } catch (err) {
        next(err);
      }
    }
  },
  delete:{
    name:"/image/:id",
    method:"delete",
    async handler(req,res,next){
      try{
        if(!req.params.id){
          throw new NotFound();
        }
        const image = await Image.findById(parseInt(req.params.id));
        if(!image){
          throw new NotFound();
        }
        fs.unlinkSync(path.resolve(__dirname, '../../../',image.url));
        await image.destroy();
        res.status(204).end();
      }catch(err){
        next(err);
      }
    }
  }
};
