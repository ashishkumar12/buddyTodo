const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ['admin','buddy'],
        required : true,
        default : 'buddy'
    }
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
    versionKey: false
});

userSchema.methods = {
    toJSON: function(obj) {
        var obj = this.toObject();
        delete obj.password;
        delete obj.__v;
        return obj
    }
};

module.exports =  mongo.model('User',userSchema);
