const mongoose = require('mongoose');

/**
* @type {mongoose.SchemaDefinitionProperty}
*/
const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: [{
        item: String,
        quantity: 'Double',
        measurement: String
    }],
    steps: { type: [String] },
    author: {
        type: String,
        required: true
    },
    public: Boolean, 
},{timestamps:true});

const recipe=mongoose.model('recipe',recipeSchema);

module.exports=recipe;
