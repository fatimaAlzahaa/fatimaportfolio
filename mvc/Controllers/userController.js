const User = require('../Models/userModel');
const hashing = require('../Utili/hashing');
const auth = require('../Utili/auth');


exports.addNewUser= async (req,res)=>{
    try
    {
        const {name,email,password,userType} = req.body;
        const hashedPassword = await hashing.hashPassword(password);

        const user = await User.create({name,email,password:hashedPassword,userType});
        res.status(201).json({ message: 'User created successfully' });
    }
    catch(err){
        res.status(500).send(err.message)
    }
}

exports.getUsers = async (req,res)=>{
    try{
        const users = await User.find().populate('userType');
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).send(err.message);
    }
}


exports.login = async (req, res) => {
  try{
      const {email , password} = req.body;
      const user = await User.findOne({email});
      if(!user){
          res.status(400).send("Email not found")
      }else{
          if(await hashing.isMatch(password , user.password) === true){
              const token = auth.signIn({
                  id: user._id, name: user.name
              })
              res.status(200).json({ message: "Logged", token })
          }else{
              res.status(400).send("wrong password")
          }
      }
  }
  catch(err){
      res.status(500).send(err)
    }
}

