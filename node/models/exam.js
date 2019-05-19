const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
  by : {
      type: Schema.Types.ObjectId,
      required : true,
  },
  details  : {
    type : String,
    required : true
  },
  date : {
    type : Date,
    required : true
  },
  location : {
    type : String,
    required : true
  },
  pincode : {
    type:Number,
    required : true
  },
 
  hallpass : {
    type : String,
    required : true
  },
  scribe : {
    type : Schema.Types.ObjectId,
    required : false
  }

})

examSchema.pre('save', async function (next) {
   
      next();
    
  });

  
// userSchema.methods.isValidPassword = function (password, callback) {
//     bcrypt.compare(password, this.password, (err, isMatch) => callback(err, isMatch));
// };

const Exam = mongoose.model('exam', examSchema);
 
// console.log(User)

module.exports = Exam;