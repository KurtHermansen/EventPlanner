const { required } = require('joi')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    given_name: {
        type: String,
        required: true
    },
    family_name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    picture: {
        type: String
    },
    locale: {
        type: String
    },
    updated_at: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    email_verified: {
        type: Boolean
    },
    sub: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model('User', UserSchema)