import mongoose  from "mongoose";

 const userSchema = new mongoose.Schema({
  fullName : {
    type: String,
    required: true,
  },
  email : {
    type: String,
    required: true,
    unique: true,
  },
  password : {
    type: String,
    required: true,
    minLength: 8
  },
  bio : {
    type: String,
    required: true,
    default: "",
  },
  profilePic : {
    type: String,
    required: true,
    default: "",
  },
  nativeLanguage : {
    type: String,
    required: true,
    default: "",
  },
  learningLanguage : [{
    type: String,
    required: true,
    default: "",
  }],
  location : {
    type: String,
    required: true,
    default: "",
  },
  isOnboarded : {
    type: Boolean,
    default: false
  },
  friends : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
 }, {timestamps : true})

 const User = mongoose.model("User",userSchema)

export default User