const router = require("express").Router();
const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const postController = require('../Controllers/postController');
// router.use(bodyParser);
// router.use(urlencoded({extended:true}));
router.use(express.static('public'));

const storage = multer.diskStorage({
   destination: function(req, file, cb) {
      // cb(null, path.join(__dirname, '../public/postDocuments'), function(err, success)
      //  {
      //    if(err) {
      //       console.log(err);
      //    }
      // });
      cb(null, './document');
   },
   filename: function(req, file, cb) {
      const name = Date.now()+'-'+file.originalname; 
      cb(null, name, function(err, success) {
         if(err) {
            console.log(err);
         }
      })
   }
});

const upload = multer({ storage: storage });


router.post('/', upload.single('image'), postController.createPost);

router.get('/', postController.getPost);

router.delete('/:id', postController.deletePost);

router.get('/update-post/:id', postController.getPostForUpdate)

router.post('/update-image/:id',upload.single('image'), postController.changeImage)

router.post('/update-details/:id', postController.updateDetails)

router.post('/register', postController.userRegister)

router.post('/login', postController.userLogin)


 



module.exports = router;