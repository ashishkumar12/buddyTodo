exports.get = (req,res,next) => {
    Todo.findOne({
        _id : req.params.todo_id
    }).exec((err,todo) => {
        if(err){
            req.data = RESP(true,null,"Something went wrong !");
        }
        if(!todo){
            req.data = RESP(true,null,"Todo not found !");
        }else{
            req.data = RESP(false,todo,"Todo found !");
        }
        next();
    });
}

exports.createTodo = (req,res,next) => {
    User.findOne({email : req.body.assigned_to}).exec((err,user) => {
        if(err){
            req.data = RESP(true,null,"Something went wrong !");
            next();
        }
        if(!user){
            req.data = RESP(true,null,"user not found with this mail id");
            next();
        }else{
            req.body.assigned_by = req.session.user._id;
            let todo = new Todo();
            todo.title = req.body.title;
            todo.description = req.body.description;
            todo.assigned_by = req.body.assigned_by;
            todo.assigned_to = user._id
            todo.save((err,result) => {
                if(err){
                    req.data = RESP(true,null,"Something went wrong !");
                }
                if(!todo){
                    req.data = RESP(true,null,"Todo not created !");
                }else{
                    req.data = RESP(false,result,"Todo created !");
                }
                next();
            });
        }
    })

}

exports.submitTodo = (req,res,next) => {
    Todo.findOne({
        _id : req.params.todo_id
    }).exec((err,todo) => {
        if(err){
            req.data = RESP(true,null,"Something went wrong !");
            next();
        }
        if(!todo){
            req.data = RESP(true,null,"Todo not found !");
            next();
        }else{
            todo.is_completed = !todo.is_completed;
            todo.save((err) => {
                if(err){
                    req.data = RESP(true,null,"Something went wrong !");
                }
                req.data = RESP(false,todo,"Todo updated !");
                next();
            });
        }
    });
}

exports.getAll = (req,res,next) => {
    Todo.find(req.query)
    .populate({
        path : 'assigned_by',
        select: '-password',
    })
    .populate({
        path : 'assigned_to',
        select: '-password',
    })
    .exec((err,todos) => {
        if(err){
            req.data = RESP(true,null,"Something went wrong !");
        }
        if(todos.length <= 0){
            const data = {assigned_by_me : [],assigned_to_me: []}
            req.data = RESP(false,data,"");
        }else{
            const assigned_by_me = _.filter(todos,(o) => o.assigned_by._id == req.session.user._id);
            const assigned_to_me = _.filter(todos,(o) => o.assigned_to._id == req.session.user._id && !o.is_completed);
            const data = {assigned_by_me,assigned_to_me}
            req.data = RESP(false,data,"Todo created !");
        }
        next();
    });
}