var express = require('express')
var router = express.Router()
const { isRealString } = require('./../bin/utils/validation')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Join | Chat app',
        bodyClass: 'class="centered-form"',
    })
})

router.get('/chat', function (req, res, next) {
    if (
        !isRealString(req.query.name) ||
        (!isRealString(req.query.room) && !isRealString(req.query.newRoom))
    ) {
        res.render('error', { message: 'Something went wrong...' })
    } else {
        res.render('chat', {
            title: 'Chat | Chat app',
            room: req.query.room || req.query.newRoom,
            bodyClass: 'class="chat"',
        })
    }
})

module.exports = router
