const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');

const SALT_WORK_FACTOR = 10;

const validateUnique = async (value) => {
    const user = await User.findOne({email: value});
    if (user) return false
};

const validateEmail = (value) => {
    const re = /^(\w+[-.]?\w+)@(\w+)([.-]?\w+)?(\.[a-zA-Z]{2,})$/;
    if (!re.test(value)) return false;
};

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {validator: validateEmail, message: 'Email is not valid'},
            {validator: validateUnique, message: 'This user is already registered'}
        ]
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['admin', 'user'],
    },
    displayName: {
        type: String,
        required: true
    },
    facebookId: String,
    avatarImage: String,
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    },
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;