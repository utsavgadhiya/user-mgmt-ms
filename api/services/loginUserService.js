'use strict'

const { createHash } = require('crypto')
const { UserModel } = require('../models/user')
const { responseGenerator } = require('../middlewares/responseGenerator')

const loginUser = async (body) => {
    try {
        body.email = body.email.toLowerCase()
        body.password = await hashPassword(body.password)
        const user = await UserModel.find({ email: body.email, password: body.password }).lean()
        console.debug('user %j', user)
        delete body.password
        if (user.length > 0) {
            return responseGenerator(200, {}, 'Logged in successfully!')
        } else {
            return responseGenerator(401, {}, 'Wrong username or password!')
        }
    } catch (error) {
        console.error('Error: ', error)
        return responseGenerator(500, {}, 'Something went wrong!')
    }
}

const hashPassword = async (password) => {
    return createHash('sha512').update(password).digest('hex').toString();
}

module.exports = {
    loginUser
}
