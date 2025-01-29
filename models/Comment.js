const mongoose=require('mongoose');

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
const commentSchema=mongoose.Schema({
    comment:{type:String,required:true},
        user:{
            id:{type: mongoose.Schema.Types.ObjectId, ref:"user"},
            username:String
        },
        recipe:{type: mongoose.Schema.Types.ObjectId, ref:"recipe"},
});

const comment=mongoose.model('comment',commentSchema);

module.exports=comment;