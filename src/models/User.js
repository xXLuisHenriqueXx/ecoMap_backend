const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: {
        _id: new mongoose.Schema.Types.ObjectId,
        filename: String,
        url: String
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                this.password = hashedPassword;
                next();
            }
        })
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

const User = model('User', userSchema);
module.exports = User;