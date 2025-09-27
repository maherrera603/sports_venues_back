import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [ true, "Missing field name"],
    },
    lastname: {
        type : String,
        required: [ true, "Missing field lastname"],
    },
    phone: {
        type: String,
        required: [ true, "Missing field phone"],
        unique: true,
    },
    email: {
        type: String,
        required: [ true, "Missing field email"],
        unique: true,
    },
    password: {
        type: String,
        required: [ true, "Missing field password"],
    },
    accountActive: {
        type: Boolean,
        require: [ true, "Missing field accountActive"],
        default: false,
    }
});

userSchema.set("toJSON",{
    virtuals: true,
    versionKey: false,
    transform: (doc, ret, option) => {}
});

export const UserModel = model('Users', userSchema);
