const router = express.Router();
const AuthController = require('./../controllers/AuthController');

router.post('/login',AuthController.login,(req,res,next) => {
    //console.log(req.data);
    res.send(req.data);
});

router.get('/login',(req,res,next) => {
    console.log('login get request');
    res.render('login/index.html', {});
});

router.get('/logout',(req,res)=>{
	req.session.destroy();
	res.redirect('/auth/login');
});

module.exports = router;