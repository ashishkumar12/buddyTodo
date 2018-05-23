exports.isBuddy = (req,res,next) => {
    if(req.session.user){
        if(req.session.user.role == 'buddy'){
            next();
        }else{
            res.send({
                data : null,
                message : "Invalid credentials"
            });
        }
    }else{
        res.redirect('/auth/login');
    }
}