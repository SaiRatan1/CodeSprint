const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    exampleIn:String,
    exampleOut:String,
    acceptance:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        required:true
    }
})


const Question = new mongoose.model("Question",questionSchema);

module.exports = Question;