exports.get = (req,res,next) => {
    User.findById({'_id' : req.session.user._id}).exec((err,user) => {
        if(err){
            console.log(err);
            req.data = RESP(true,null,"Something went wrong !");
        }
        if(user){
            req.data = RESP(false,user,"");
        }else{
            req.data = RESP(true,null,"user not found !"); 
        }
        next();
    })
}

exports.getAllusers = (req,res,next) => {
    User.find({'role' : 'buddy'}).exec((err,user) => {
        if(err){
            console.log(err);
            req.data = RESP(true,null,"Something went wrong !");
        }
        if(user){
            req.data = RESP(false,user,"");
        }else{
            req.data = RESP(true,null,"users not found !"); 
        }
        next();
    })
}