const express = require('express')
const {login, checker} = require('../controllers/authcontroller')

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello')
})

router.post('/login', login)

router.get('/check', checker)

module.exports = router;