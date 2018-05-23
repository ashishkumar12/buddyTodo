exports.isAdmin = (req,res,next) => {
    if(req.session.user.role == 'admin'){
        next();
    }else{
        res.send({
            data : null,
            message : "Invalid credentials"
        });
    }
}