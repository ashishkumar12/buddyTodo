const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assigned_to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: {
            sparse: true
        }
    },
    assigned_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: {
            sparse: true
        }
    },
    is_completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
    versionKey: false
});

todoSchema.methods = {
    toJSON: function (obj) {
        var obj = this.toObject();
        delete obj.__v;
        return obj
    }
};
todoSchema.pre('update', function () {
    this.update({}, {
        $set: {
            updatedAt: new Date()
        }
    });
});
module.exports = mongo.model('Todo', todoSchema);
