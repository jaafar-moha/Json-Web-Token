const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.get('/profile', auth, async (req, res) => {
    console.log(req.user)
    return res.json(serializeUser(req.user))

  })

 const serializeUser = (user) => {
    return {
      name: user.name,
      email: user.email,
      role: user.role,
    }
  }


module.exports = router