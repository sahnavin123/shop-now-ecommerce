const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {type: String, required: true}, 
    email : {type: String, required: true, unique: true}, 
    password : {type : String , required: true}
}, {timestamps: true})



mongoose.models = {}

export default mongoose.model("User", UserSchema)

//or we can write instead of above 2 lines
// export default mongoose.models.Product || mongoose.model("Product", ProductSchema);