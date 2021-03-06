const router = express.Router();

router.get('/',(req,res)=> {
	if(req.session.user){
		if(req.session.user.role !== 'admin'){
			res.redirect('/user');
		}else if(req.session.user.role === 'admin'){
			res.redirect('/admin');
		}else{
			res.redirect('/auth/logout');
		}
	}else{
		res.redirect('/auth/login');
	}
});

module.exports = router;
