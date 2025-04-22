const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const sellerModel = require('../model/sellerModel')
const secret = "kuldeepnn"

exports.userSignup = async (req, res) => {
    const data = req.body
    console.log(data)
    const { name, email, password, phone ,shopname,gst,role} = req.body;
    

    if (!name) {return res.status(400).json({ error: "Name is required!" })}
    if (!email) {return res.status(400).json({ error: "email is required!" });}
    if (!password) {return res.status(400).json({ error: "password is required!" });}
    if (!phone) {return res.status(400).json({ error: "phone is required!" });}
   

    const existinguser = await User.findOne({ email });
    if (existinguser) {
        console.log("user already exist, please login !!");
       return res.status(400).json({
            message: "user already exist, please login !!"
        })
    }

    
    const salt = bcrypt.genSaltSync(10); 
    const hash = bcrypt.hashSync(password, salt); 

    console.log(data)
    const result = { name, email, password : hash, phone,role  }
    const newUser = new User(result);
    await newUser.save();

    let sellerId = null;

    if(role ==="seller"){
        if(!shopname || !gst){
            return res.status(400).json({message:"all felds require"})
        }
    }
if(role ==="seller"){
    const newSeller = new sellerModel({
        shopname,
        gst,
        userId:newUser._id
    })
    const saveSeller= await newSeller.save();
    sellerId=saveSeller._id;

    newUser.sellerDetails = sellerId
}
    await newUser.save();
    res.status(201).json({
        success: true,
        message: "user created successfully !",
        newUser
    })

}


exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log('>>>>>>>bdy>>>',req.body)

    if (!email) {return res.status(400).json({ error: "email is required!" });}
    if (!password) {return res.status(400).json({ error: "password is required!" });}

    const existinguser = await User.findOne({ email });
    console.log(">>>existinguser>>>>>e",existinguser)
    if (!existinguser) {
        return res.status(400).json({
            message: "user not registered, please signUp !!"
        })
    }
    
    const match = await bcrypt.compare(password, existinguser.password)
    console.log(">>match>>>.",match)
    if (!match) {
        return res.status(400).json({ message: "invalid password !" })
    }

    const token = jwt.sign({ id: existinguser._id }, secret, { expiresIn: "7d" });
    console.log('token>>>', token);

    return res.status(200).json({ message: "Login successful!", User: existinguser ,token});
}

