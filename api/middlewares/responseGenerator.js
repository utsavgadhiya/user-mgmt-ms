'use strict'

const responseGenerator = (code, data, message) => {
    return {
        code: code ? code : 'NA',
        data: data ? data : {},
        message: message ? message : 'NA'
    }
}

module.exports = {
    responseGenerator
}
