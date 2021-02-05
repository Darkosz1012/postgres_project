const Router = require('express-promise-router')
const db = require('../../db');
const hash = require('../../auth/hash');
const jwt = require("jsonwebtoken");

const router = new Router()
module.exports = router


router.post('/', async (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
    try{
        // const result = await db.query(`INSERT INTO "public"."users" ("username", "password") VALUES ($1, $2)`, [username, await hash(password)])
        const { rows } = await db.query('SELECT * FROM public.users WHERE username = $1', [username])
        const user = rows[0];
        const token = {
            "accessToken": jwt.sign({ username: user.username, id_user: user.id_user, role: user.role }, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1m' }),
            "refreshToken": jwt.sign({ username: user.username, id_user: user.id_user, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        }
        res.json({
            success: true,
            message: 'Registration succeed',
            token: token
        });
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }
});