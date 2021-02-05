const Router = require('express-promise-router')
const db = require('../../db');
const auth = require('../../auth/auth');

const router = new Router()
module.exports = router


router.get('/', auth ,async (req, res) => {
    try{
        const { rows } = await db.query('SELECT * FROM public.orders_products');
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
        const { rows } = await db.query('SELECT * FROM public.orders_products WHERE id_orders_products=$1',[req.params.id]);
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
    const { id_product, id_order, quantity } = req.body;
    try{
        const result = await db.query(`INSERT INTO "public"."orders_products" (id_product, id_order, quantity) VALUES ($1, $2, $3)`, [id_product, id_order,quantity])
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
    const { id_product, id_order, quantity } = req.body;
    try{
        const result = await db.query(`UPDATE public.orders_products SET id_product=$1, id_order=$2, quantity=$3 WHERE id_orders_products=$4`, [id_product, id_order, quantity, req.params.id])
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
        const result = await db.query(`DELETE FROM public.orders_products WHERE id_orders_products=$1`, [req.params.id])
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