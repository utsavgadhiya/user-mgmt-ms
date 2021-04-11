'use strict'

const router = require('express').Router()
const { createUser } = require('../services/createUserService')
const { loginUser } = require('../services/loginUserService')
const { responseGenerator } = require('../middlewares/responseGenerator')

router.post('/user/create', async (req, res) => {
    let body = req.body
    // check if body is valid
    if (
        !body || !body.name ||
        !body.uname || !body.password ||
        !body.email
    ) {
        res.status(400).send(responseGenerator(400, {}, 'Bad Request. Please check req body!'))
    } else {
        const result = await createUser(body)
        if (result && result.code === 201) {
            res.status(201).send(result)
        } else if (result && result.code === 409) {
            res.status(409).send(result)
        }
        else {
            res.status(500).send(result)
        }
    }
})

router.post('/user/login', async (req, res) => {
    let body = req.body
    // check if body is valid
    if (!body || !body.email || !body.password) {
        res.status(400).send(responseGenerator(400, {}, 'Bad Request. Please check req body!'))
    } else {
        const result = await loginUser(body)
        if (result && result.code === 200) {
            res.status(200).send(result)
        } else if (result && result.code === 401) {
            res.status(401).send(result)
        }
        else {
            res.status(500).send(result)
        }
    }
})

module.exports = router
