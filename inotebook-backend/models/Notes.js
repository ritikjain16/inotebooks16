const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    userid:String,
    title:String,
    description:String,
    tag:String
})

module.exports = mongoose.model("Note",noteSchema)