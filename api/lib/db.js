'use strict'

const mongoose = require('mongoose')

const initiateDbConnection = async (opts) => {
    try {
        global.db = await mongoose.connect(opts.uri, opts.options)
        console.debug('Connection to db successful!')
    } catch (error) {
        console.error('Connection to db failed!')
        throw error
    }
}

module.exports = {
    initiateDbConnection
}
