const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/test',(req,res,next) => {
  console.log(req);
  res.end('');
})
module.exports = router;
