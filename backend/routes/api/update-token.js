const Router = require('express-promise-router')
const jwt = require("jsonwebtoken");

const router = new Router()
module.exports = router

router.post('/', async (req, res) => {
    let { refreshToken } = req.body;
    try{
        if(await jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET)){
            const {username, id_user, role} = jwt.decode(refreshToken)
            const token = {
                "accessToken": jwt.sign({ username: username, id_user: id_user, role: role}, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '5s' }),
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