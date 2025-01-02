const mongoose=require("mongoose");
const connectDB=async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/db_recipe_application");
        console.log("MongoDB connected :)");
    } catch (error) {
        console.log("MongoDB not connected :(");
    }
}

module.exports=connectDB;