global.mongo = require('mongoose');
global.Schema = mongo.Schema;
global.passwordHash = require('password-hash');

exports.init = (cb) => {
    console.log('DB connected !');
    return mongo.connect(process.env.DB_URL,(err,db) => {
        if(err){
            console.log('Error in mongo connection..',err);
            cb(err,null);
        }
        createAdmin();
    });
} 

function createAdmin(){
    User.find({role : 'admin'},(err,user) => {
        if(err){
            console.log('Error in creating default admin');
        }
        if(user.length > 0){
            console.log('Admin already exists. Skipping this step...');
        }else{
            let newuser = {};
            newuser.name = 'admin';
            newuser.email = 'admin@buddy.com';
            newuser.password = passwordHash.generate('admin');
            newuser.role = 'admin';
            let adminUser = new User(newuser);
            adminUser.save((err,result)=>{
               if (err) throw err;
               console.log('[✔] admin created successfully','\n');
               console.log('default credentials for admin :','\n');
               console.log('email : admin@buddy.com','\n');
               console.log('password : admin','\n');
            });
        }
    })
}