const Router = require('express-promise-router')
const db = require('../../db');
const auth = require('../../auth/auth');
const hash = require('../../auth/hash');
const router = new Router()
module.exports = router


router.get('/', auth ,async (req, res) => {
    try{
        const { rows } = await db.query('SELECT * FROM public.users');
        res.json({
            success: true,
            message: 'Command executed.',
            res: rows
        });
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }
});

router.get('/:id', auth ,async (req, res) => {
    try{
        const { rows } = await db.query('SELECT * FROM public.users WHERE id_user=$1',[req.params.id]);
        res.json({
            success: true,
            message: 'Command executed.',
            res: rows
        });
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }
});

router.post('/', auth ,async (req, res) => {
    const { username, password, role } = req.body;
    try{
        const result = await db.query(`INSERT INTO "public"."users" (username, password, role) VALUES ($1,$2,$3)`, [username, await hash(password), role])
        res.json({
            success: true,
            message: 'Command executed.',
            res: result
        });
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }
});

router.put('/:id', auth ,async (req, res) => {
    const { username, password, role } = req.body;
    try{
        if(password !=""){
            const result = await db.query(`UPDATE public.users SET username=$1, password=$2, role=$3 WHERE id_user=$4`, [username, await hash(password), role, req.params.id])
        }else{
            const result = await db.query(`UPDATE public.users SET username=$1,  role=$2 WHERE id_user=$3`, [username, role, req.params.id])
        }
        res.json({
            success: true,
            message: 'Command executed.',
            res: result
        });
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }
});

router.delete('/:id', auth ,async (req, res) => {
    const { name } = req.body;
    try{
        const result = await db.query(`DELETE FROM public.users WHERE id_user=$1`, [req.params.id])
        res.json({
            success: true,
            message: 'Command executed.',
            res: result
        });
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }
});