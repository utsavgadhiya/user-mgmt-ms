'use strict'

const { createHash } = require('crypto')
const { UserModel } = require('../models/user')
const { responseGenerator } = require('../middlewares/responseGenerator')

const createUser = async (body) => {
    // save user details to db
    try {
        body.email = body.email.toLowerCase()
        body.password = await hashPassword(body.password)
        const user = await UserModel.find({ email: body.email }).lean()
        console.debug('user %j', user)
        // only save data if userdata does not exists in db
        if (user.length === 0) {
            const userData = new UserModel(body)
            userData.save((err) => {
                if (err) {
                    throw err
                }
            })
            console.debug('Record saved succesfully to db!')
            delete body.password
            return responseGenerator(201, {}, `User created for '${body.name}'`)
        } else {
            delete body.password
            return responseGenerator(409, {}, 'Resource already exists!')
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
    createUser
}
