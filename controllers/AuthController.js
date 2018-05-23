module.exports = {
    login : function(req,res,next){
		User.findOne({
			email : req.body.email
		},(err,user)=>{
			if(err){
				console.log('[x] error in finding user : ',err);
				res.redirect('/auth/login');
			}
			if(!user){
				res.redirect('/auth/login');
			}else{
				if(passwordHash.verify(req.body.password, user.password)){
					req.session.user = user;
					req.data = {
						error : false,
                        data : user,
                        message : "user found"
                    };
				} else {
                    req.data = {
						error : true,
                        data : null,
                        message : "wrong password entered"
                    };
				}
				next();
			}
		});
	}
}