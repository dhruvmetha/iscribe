const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  as : {
    type : String,
    required : true
  },
  firstName : {
    type : String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },
  address : {
    type : String,
    required : true
  },
  occupation : {
    type : String,
    required : true
  },
  aadharno : {
    type : String,
    required : true
  },
  email : {
        type:String,
        lowercase : true,
        required : true
  },
  password  : {
      type:String,
      required : true
  },
  gender  : {
    type:String,
    required : true
  },
  number1  : {
    type:String,
    required : true
  },
  number2  : {
    type:String,
  },
  pincode : {
    type:Number,
    required : true
  },
  age : {
    type:Number,
    required : true
  },

  aadharCard : {
    type : String,
    required : true
  },
  sslc : {
    type : String,
  },
  puc : {
    type : String, 
  },
  ug : {
    type : String, 
  },
  pg : {
    type : String, 
  },
  qualification : {
    type : [String],
  },
  dob : {
    type : Date,
    required : true
  },
  disabilityProof : {
    type : String,
  },
  opportunity:{
    type : [Schema.Types.ObjectId],
  }

})


userSchema.pre('save', async function (next) {
    try {
      //the user schema is instantiated
      const user = this;
      //check if the user has been modified to know if the password has already been hashed
          if (!user.isModified('password')) {
            next();
          }
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Generate a password hash (salt + hash)
      const passwordHash = await bcrypt.hash(this.password, salt);
      // Re-assign hashed version over original, plain text password
      this.password = passwordHash;
      next();
    } catch (error) {
      next(error);
    }
  });

  
userSchema.methods.isValidPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => callback(err, isMatch));
};

const User = mongoose.model('user', userSchema);
 
// console.log(User)

module.exports = User;