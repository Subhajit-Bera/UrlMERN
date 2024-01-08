const mongoose=require("mongoose");

const urlSchema=new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        unique: true,
        required:true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    expiresAt: { 
        type: Date, 
        default: () => new Date(+new Date() + 48 * 60 * 60 * 1000) 
    }, // 48 hours expiration
    clicks: [
        {
          timestamp: { type: Date, default: Date.now },
          ipAddress: String,
        },
    ]    
})


module.exports = mongoose.model("Url",urlSchema);