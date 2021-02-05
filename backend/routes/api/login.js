const Router = require('express-promise-router')
const db = require('../../db');
const verify = require('../../auth/verify');
const jwt = require("jsonwebtoken");

const router = new Router()
module.exports = router

router.post('/', async (req, res) => {
    const { username, password } = req.body
    try{
        const { rows } = await db.query('SELECT * FROM public.users WHERE username = $1', [username])
        const user = rows[0];
        if (await verify(password, user.password)) {
            const token = {
                "accessToken": jwt.sign({ username: user.username, id_user: user.id_user, role: user.role}, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1m' }),
                "refreshToken": jwt.sign({ username: user.username, id_user: user.id_user, role: user.role}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            }
            res.json({
                success: true,
                message: 'Authentication succeed',
                token: token
            });
        } else {
            res.json({
                success: false,
                message: 'Username or password incorrect'
            });
        }
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }

})