const Router = require('express-promise-router')
const db = require('../../db');
const auth = require('../../auth/auth');

const router = new Router()
module.exports = router


router.get('/', auth ,async (req, res) => {
    try{
        const { rows } = await db.query('SELECT * FROM public.products_ingredients');
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
        const { rows } = await db.query('SELECT * FROM public.products_ingredients WHERE id_products_ingredients=$1',[req.params.id]);
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
    const { id_product, id_ingredient ,quantity} = req.body;
    try{
        const result = await db.query(`INSERT INTO "public"."products_ingredients" (id_product, id_ingredient) VALUES ($1, $2, $3)`, [id_product, id_ingredient,quantity])
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
    const { id_product, id_ingredient,quantity } = req.body;
    try{
        const result = await db.query(`UPDATE public.products_ingredients SET id_product=$1, id_ingredient=$2, quantity=$3 WHERE id_products_ingredients=$4`, [id_product, id_ingredient,quantity, req.params.id])
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
        const result = await db.query(`DELETE FROM public.products_ingredients WHERE id_products_ingredients=$1`, [req.params.id])
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