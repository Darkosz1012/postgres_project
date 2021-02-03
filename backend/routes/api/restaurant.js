const Router = require('express-promise-router')
const db = require('../../db');
const auth = require('../../auth/auth');
const router = new Router()
module.exports = router


router.get('/', auth ,async (req, res) => {
    try{
        const { rows } = await db.query('SELECT * FROM public.restaurants');
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
        const { rows: restaurant } = await db.query('SELECT * FROM public.restaurants WHERE id_restaurant=$1',[req.params.id]);
        const { rows:  products } = await db.query('SELECT * FROM public.products WHERE id_restaurant=$1',[req.params.id]);
        const { rows: reviews } = await db.query('SELECT * FROM public.reviews WHERE id_restaurant=$1',[req.params.id]);
        res.json({
            success: true,
            message: 'Command executed.',
            res: {
                restaurant,
                products,
                reviews
            }
        });
    }catch(err){
        res.json({
            success: false,
            message: err
        });
    }
});

router.post('/', auth ,async (req, res) => {
    const { name, address, latitude, longitude, description, publish} = req.body;
    try{
        const result = await db.query(`INSERT INTO public.restaurants (name, address, latitude, longitude, description, publish) VALUES ($1, $2, $3, $4, $5, $6)`, [name, address, latitude, longitude, description, publish])
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
    const { name, address, latitude, longitude, description, publish } = req.body;
    try{
        const result = await db.query(`UPDATE public.restaurants SET name=$2, address=$3, latitude=$4, longitude=$5, description=$6, publish=$7 WHERE id_restaurant=$1;`, [req.params.id, name, address, latitude, longitude, description, publish])
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
    try{
        const result = await db.query(`DELETE FROM public.restaurants WHERE id_restaurant=$1`, [req.params.id])
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