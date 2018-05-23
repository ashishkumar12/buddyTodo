exports.checkForRole = (req,res,next) => {
    if(req.session.user){
        if(req.session.user.role == 'admin'){
            res.redirect('/admin');
        }else if(req.session.user.role == 'user'){
            res.redirect('/admin');
        }else{
            res.redirect('/auth/login');
        }
    }else{
        res.redirect('/auth/login');
    }
}