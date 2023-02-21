import mongoose from "mongoose"
const { Schema } = mongoose;
var userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },

        email: {
            type: String, 
            required : [true, 'Please add an email'],
            unique: true,
        },

        password: {
            type: String,
            required: [true, 'Please provide a password'],
        },
        dateOfBirth: Date,
        createdAt: Date,
        modifiedAt: Date,
        Address1: String,
        Address2: String,
        City: String,
        State: String,
        ZipCode: Number,
    }
)
const  User = mongoose.model('User', userSchema);
export default User