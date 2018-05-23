Handlebars.registerHelper('stringifyObject',function(obj){
    return JSON.stringify(obj);
});
Handlebars.registerHelper('compare',function(val1,val2,opts){
    if(val1 == val2){
        return opts.fn(this);
    }else{
        return opts.inverse(this);
    }
});
Handlebars.registerHelper('getTimeDate',function(timestamp){
    return new Date(timestamp);
});

Handlebars.registerHelper('ternary', function(val, onTrue, onFalse){
	return val ? onTrue : onFalse;
});
