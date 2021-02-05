const Router = require('express-promise-router')
const db = require('../../db');
const auth = require('../../auth/auth');

const router = new Router()
module.exports = router


router.get('/', auth ,async (req, res) => {
    try{
        const { rows } = await db.query('SELECT * FROM public.products');
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
        const { rows } = await db.query('SELECT * FROM public.products WHERE id_product=$1',[req.params.id]);
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
    
    let { name, price, description, id_restaurant } = req.body;
    // id_restaurant = parseInt(id_restaurant)
    console.log(name, price, description, id_restaurant)
    try{
        const result = await db.query(`INSERT INTO "public"."products" (name, price, description, id_restaurant) VALUES ($1, $2, $3, $4)`, [name, price, description, id_restaurant])
        console.log(result)
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
    // console.log(req.body)
    let { name ,price, description, id_restaurant } = req.body;
    // id_restaurant = parseInt(id_restaurant)
    console.log(name, price, description, id_restaurant)
    try{
        // const result = await db.query(`UPDATE public.products SET name=$2, price=$3, description=$4, id_restaurant=$5  WHERE id_product=$1`, [req.params.id,name,price, description, id_restaurant])
        const result = await db.query(`SELECT public.update_product($1, $2, $3, $4, $5)`, [req.params.id,name,price, description, id_restaurant])
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
        const result = await db.query(`DELETE FROM public.products WHERE id_product=$1`, [req.params.id])
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