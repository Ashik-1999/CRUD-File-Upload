const Post = require('../Models/post');
const moment = require('moment')
const User = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const maxAge = 3 * 24 * 60 * 60;




const createToken = (userData) => {
    return jwt.sign({ user:userData},process.env.ACCESS_TOKEN_SECRET , {
        expiresIn: maxAge
    })
}

const createPost = async(req,res) => {
        console.log(req.file,"fikleeee")
        
    try {
        const date = new Date();
        const formatedDate = moment(date).format('MM/DD/YYYY');
        const time = moment(date, "HH:mm:ss").format("hh:mm A");
        var ext = req.file.filename.substr(req.file.filename.lastIndexOf('.') + 1);
        const post = new Post({
            title: req.body.title,
            date: formatedDate,
            time,
            image: req.file.filename,
            fileExt:ext
         })
         const postData = await post.save();

         res.status(200).json(postData);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const getPost = async(req, res) => {
    try {
       const posts = await Post.find({})
       
       res.status(200).json(posts);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const deletePost = async(req,res) =>{
    const {id} = req.params
   try {
        const data = await Post.findByIdAndDelete(id)
        res.status(200).json(true)
   } catch (error) {
    res.status(500).json(err)
        console.log(error)
   }
}

const getPostForUpdate = async (req,res) =>{
    const {id} = req.params
    try{
        const post = await Post.findById(id)

        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
    
}

const changeImage = async (req,res) =>{
    const filename = req.file.filename
    const {id} = req.params
    const date = new Date();
    const updatedDate = moment(date).format('MM/DD/YYYY');
    const time = moment(date, "HH:mm:ss").format("hh:mm A");
    var ext = filename.substr(filename.lastIndexOf('.') + 1);

   const updatedTime = updatedDate + ' ' + time
  
    
   try {
    const update =await Post.findByIdAndUpdate(id,{
        $set:{
            image:filename,
            lastUpdate:updatedTime,
            fileExt:ext
    }
     })
     console.log(update)
     res.status(200).json(update)
   } catch (error) {
        console.log(error)
   }
}

const updateDetails = async(req,res) =>{
    const {id} = req.params
    const {title} = req.body
    const date = new Date();
    const updatedDate = moment(date).format('MM/DD/YYYY');
    const time = moment(date, "HH:mm:ss").format("hh:mm A");
    const updatedTime = updatedDate + ' ' + time
    try {
        const update =await Post.findByIdAndUpdate(id,{
            $set:{title:title,lastUpdate:updatedTime}
         })
         console.log(update)
         res.status(200).json(update)
       } catch (error) {
            console.log(error)
       }
}

const userRegister = async(req,res) =>{
    console.log(req.body)
    const userData = await User.findOne({email:req.body.email})
    if(userData){
        res.json({userExist:true})
    }else{
        try{
        const salt = await bcrypt.genSalt(10);
        console.log(salt)
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const newUser = new User({
        fullname : req.body.fullname,
        email : req.body.email,
        password : hashedPassword,
        number:req.body.number
     }) 
    const user =await newUser.save();
    res.status(200).json(user)
    } catch(err){
        console.log(err.message)
    res.status(500).json(err)
    }  
    }
}

const userLogin = async(req,res) =>{
    try{
        
        const user = await User.findOne({email:req.body.email})
       
        if(!user){
           return res.json({notFound:true})
        }
       
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
           return  res.json({passwordNotFound:true}); 

        }

        const {password,...others} = user._doc
    
     
        const token = createToken(others);
        console.log(token)
        // res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });   
        res.status(200).json({jwt:token})

    } catch(err){
        console.log(err.message)
        res.status(500).json(err)
         
    } 
}
module.exports = {
    createPost,
    getPost,
    deletePost,
    getPostForUpdate,
    changeImage,
    updateDetails,
    userRegister,
    userLogin
}