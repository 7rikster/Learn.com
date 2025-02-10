const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../../controllers/auth-controller');
const authenticateMiddleware = require('../../middleware/auth-middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/check-auth', authenticateMiddleware, (req, res)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        message: 'User is authenticated',
        data: {
            user
        }
    });
})

module.exports = router;