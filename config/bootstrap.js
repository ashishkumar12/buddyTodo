const db = require('./db').init();

exports.init = () => {
    require('./loader').load();
}
global.RESP = (err,data,msg) => {
    return {
        error : err,
        data : data,
        message : msg
    }
}