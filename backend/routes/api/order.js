const Router = require('express-promise-router')
const db = require('../../db');
const auth = require('../../auth/auth');

const router = new Router()
module.exports = router


router.get('/', auth ,async (req, res) => {
    try{
        const { rows } = await db.query('SELECT * FROM public.orders');
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
        const { rows } = await db.query('SELECT * FROM public.orders WHERE order_all_data.id_order=$1',[req.params.id]);
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
router.get('/user/:id', auth ,async (req, res) => {
    try{
        const { rows } = await db.query('SELECT * FROM public.orders WHERE id_user=$1',[req.params.id]);
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
    let { id_user, id_restaurant, id_status, date, address } = req.body;
    // id_status = id_status ? id_status: 1;
    // date = date ? date: new Date();

    try{
        const result = await db.query(`INSERT INTO "public"."orders" (id_user, id_restaurant, id_status, date, address) VALUES ($1,$2,$3,$4,$5)`, [id_user, id_restaurant, id_status, date, address])
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

router.post('/products', auth ,async (req, res) => {
    let { id_user, id_restaurant, id_status, date, address, products} = req.body;
    id_status = id_status ? id_status: 1;
    date = date ? date: new Date();
    try{
        const client = await db.getClient();
        try {
            
            await client.query('BEGIN')
            var result = await client.query(`INSERT INTO "public"."orders" (id_user, id_restaurant, id_status, date, address) VALUES ($1,$2,$3,$4,$5)  RETURNING *`, [id_user, id_restaurant, id_status, date, address])
            // console.log(result.rows)
            for(var i in products){
                if(products[i].quantity>0)
                    await client.query(`INSERT INTO "public"."orders_products" (id_product, id_order, quantity) VALUES ($1, $2, $3)`, [products[i].id_product, result.rows[0].id_order, products[i].quantity])
            }
            await client.query('COMMIT')
            res.json({
                success: true,
                message: 'Command executed.',
                res: result
            });
        } catch (err) {
            await client.query('ROLLBACK')
            console.error(err)
            res.json({
                success: false,
                message: err
            });
        } finally {
            client.release()
        }
    }catch(err){
        console.error(err)
        res.json({
            success: false,
            message: err
        });
    }
});



router.put('/:id', auth ,async (req, res) => {
    const { id_user, id_restaurant, id_status, date, address } = req.body;
    try{
        const result = await db.query(`UPDATE public.orders SET id_user=$2, id_restaurant=$3, id_status=$4, date=$5, address=$6 WHERE id_order=$1`, [req.params.id,id_user, id_restaurant, id_status, date, address])
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
        const result = await db.query(`DELETE FROM public.orders WHERE id_order=$1`, [req.params.id])
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
router.delete('/all/:id', auth ,async (req, res) => {
    try{
        const result = await db.query(`SELECT public.delete_order($1)`, [req.params.id])
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