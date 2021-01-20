const Router = require('express-promise-router')
const db = require('../../db');
const auth = require('../../auth/auth');

const router = new Router()
module.exports = router


router.get('/', auth ,async (req, res) => {
    try{
        const { rows } = await db.query('SELECT * FROM public.statuses');
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
        const { rows } = await db.query('SELECT * FROM public.statuses WHERE id_status=$1',[req.params.id]);
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
    const { name } = req.body;
    try{
        const result = await db.query(`INSERT INTO "public"."statuses" ("name") VALUES ($1)`, [name])
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
    const { name } = req.body;
    try{
        const result = await db.query(`UPDATE public.statuses SET name=$1 WHERE id_status=$2`, [name, req.params.id])
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
        const result = await db.query(`DELETE FROM public.statuses WHERE id_status=$1`, [req.params.id])
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