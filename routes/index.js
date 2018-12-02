var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const client = await res.locals.dbPool.connect()
        const result = await client.query('SELECT * FROM testdb');
        const results = { 'results': (result) ? result.rows : null};
        res.render('pages/index', { message: 'This is Awesome Sauce', results });
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
    
});

module.exports = router;
