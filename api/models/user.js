'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    uname: String,
    email: {
        type: String
        // match: /[a-z]+@[a-z]{1,9}.[a-z]{1,5}.[a-z]{1,5}/
    },
    password: String,
    created_on: {
        type: Date,
        default: Date.now
    },
    updated_on: {
        type: Date,
        default: Date.now
    }
})

const UserModel = mongoose.model('user', userSchema)

module.exports = {
    UserModel
}
