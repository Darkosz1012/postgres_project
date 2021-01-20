const Router = require('express-promise-router')
const jwt = require("jsonwebtoken");

const router = new Router()
module.exports = router

router.post('/', async (req, res) => {
    const { refreshToken } = req.body;
    try{
        if(await jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET)){
            const token = {
                "accessToken": jwt.sign(jwt.decode(refreshToken), process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1m' }),
                "refreshToken": refreshToken
            }
            res.json({
                success: true,
                message: 'Authentication succeed',
                token: token
            });
        }
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }

})