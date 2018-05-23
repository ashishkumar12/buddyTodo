const router = express.Router();
const TodoController = require('./../controllers/TodoController');
const AdminController = require('./../controllers/AdminController');


router.get('/',(req,res,next) => {
    res.render('user/index.html',{
        user : req.session.user,
        // todos : req.data.data
    });
});

router.get('/getalltodo',TodoController.getAll,(req,res,next) => {
    res.send(req.data);
});

router.get('/todo/:todo_id',TodoController.get,(req,res,next) => {
    res.send(req.data);
});

router.post('/todo/create',TodoController.createTodo,(req,res,next) => {
    res.send(req.data);
});

router.post('/todo/:todo_id/submit',TodoController.submitTodo,(req,res,next) => {
    res.send(req.data);
});

module.exports = router;