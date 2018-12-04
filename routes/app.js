var express = require('express');
var router = express.Router();

// TODO: Move this function globally 
var secured = function () {
    return function secured (req, res, next) {
      if (req.user) { return next(); }
      req.session.returnTo = req.originalUrl;
      res.redirect('/');
    };
};

// TODO: Move db connection global
router.get('/app', secured(), async (req, res, next) => {
  try {
    const client = await res.locals.dbPool.connect()
    const result = await client.query('SELECT * FROM todos WHERE userid = $1 AND completed IS NULL', [res.locals.user.id]);
    const results = (result) ? result.rows : null;
    res.render('pages/app', {results});
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

router.post('/app/add', secured(), async (req, res, next) => {
  try {
    const client = await res.locals.dbPool.connect();
    await client.query('INSERT INTO todos (userid, name) VALUES ($1, $2)', [res.locals.user.id, req.body.name]);
    res.redirect('/app');
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

router.get('/app/:todoId/completed', secured(), async (req, res, next) => {
  try {
    const client = await res.locals.dbPool.connect();
    await client.query('UPDATE todos SET completed = NOW() WHERE id = $1 AND userid = $2', [req.params.todoId, res.locals.user.id]);
    res.redirect('/app');
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

module.exports = router;
