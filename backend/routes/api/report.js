const Router = require('express-promise-router')
const db = require('../../db');
const auth = require('../../auth/auth');

const router = new Router()
module.exports = router



router.get('/order_all_data', auth ,async (req, res) => {
    try{
        const { rows } = await db.query('SELECT * FROM public.order_all_data');
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

router.get('/order_all_data/user/:id', auth ,async (req, res) => {
    try{
        const { rows } = await db.query('SELECT * FROM public.order_all_data WHERE id_user=$1',[req.params.id]);
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


router.get('/product_ingredient', auth ,async (req, res) => {
    try{
        const { rows } = await db.query('SELECT * FROM public.product_ingredient');
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


router.get('/restaurant_rating', auth ,async (req, res) => {
    try{
        const { rows } = await db.query('SELECT * FROM public.restaurant_rating');
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

router.get('/user_restaurant', auth ,async (req, res) => {
    try{
        const { rows } = await db.query('SELECT * FROM public.user_restaurant');
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

router.get('/restaurant_income', auth ,async (req, res) => {
    try{
        const { rows } = await db.query('SELECT * FROM public.restaurant_income');
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

