exports.createUser = (req,res,next) => {
    User.findOne({
        email : req.body.email
    }).exec((err,user) => {
        if(err){
            console.log(err);
            req.data = RESP(true,null,"Something went wrong");
        }
        console.log(user);
        if(!user){
            let newuser = {};
            newuser.name = req.body.name;
            newuser.email = req.body.email;
            newuser.password = passwordHash.generate(req.body.password);
            newuser.role = req.body.role;
            let newUser = new User(newuser);
            newUser.save((err,result)=>{
               if (err){
                    console.log(err);
                    req.data = RESP(true,null,"Something went wrong !");
               }
               if(result){
                    req.data = RESP(false,result,"user created successfully !");  
               }else{
                    req.data = RESP(true,null,"user not created");
               }   
               next();       
            });
        }else{
            req.data = RESP(true,null,"user already exists");
            next(); 
        }
    })
}