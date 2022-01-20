const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: string,
        required: true,
    },
    description:{
        type: string,
        required: true,
    },
    image:{
        type: string,
        required: true,
    },
    price:{
        
    }

});
