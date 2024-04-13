import mongoose from "mongoose";

// Schema making thinges to be te the here
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String }, // String is shorthand for {type: String}
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {type : String, minLength : 3, required : true},
    token: String // JWT token string
});
// collection make after convert User -> Products -> "s"
const User = mongoose.model('User', userSchema);

// console.log(User);

export default User;
