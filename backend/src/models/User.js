import mongoose  from "mongoose";
import bcrypt from "bcryptjs"

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

 //prehook

 userSchema.pre("save", async function (next) {

  if(!this.isModified("password"))  return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error){
    next(error)
  }
 })

userSchema.methods.matchPassword = async function (enteredPassword) {
  const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password)
  return isPasswordCorrect
}

const User = mongoose.model("User",userSchema)

export default User;