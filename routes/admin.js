const router = express.Router();
const AdminController = require('./../controllers/AdminController');
const UserController = require('./../controllers/UserController');

router.get('/',(req,res,next) => {
    res.render('admin/index.html',{});
});

router.get('/allusers',UserController.getAllusers,(req,res,next) => {
    res.send(req.data);
});

router.get('/me',UserController.get,(req,res,next) => {
    res.send(req.data);
});

router.post('/create_user',AdminController.createUser,(req,res,next) => {
    res.send(req.data);
});

module.exports = router;