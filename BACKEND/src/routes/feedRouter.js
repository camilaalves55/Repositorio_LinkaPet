const router = require('express').Router();
const upload = require('../config/multer');

const { cadastrarPost } = require('../controller/feedController');

router.post('/cadastrar/post', upload.single('file'), cadastrarPost);
// router.post('/cadastrar/post', upload.array);

module.exports = router;