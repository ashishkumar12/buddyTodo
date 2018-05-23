function HandlebarsTemplates(){
	var user_table = $('#user_table').html();
	user_table_Template = Handlebars.compile(user_table);
}

function handleUsers(){
    var _this = this;
    this.$el = $('#dashboard');
    
    function Fetch(url,cb){
		$.ajax({
			url : url,
			type : 'GET',
			success : function(response){
				cb(response);
			}
		});
	}
	function Post(url,data,cb){
		$.ajax({
			url : url,
			type : 'POST',
			data : data,
			success : function(response){
				cb(response);
			}
		});
    }
    
	this.createNewUser = function(){
		$('#create_user_form').submit(function(e){
			var values = $(this).serializeArray();
			$('#submit_new_user').attr("disabled",true);
			e.preventDefault();
			var obj = {};
			for(var i = 0 ; i < values.length ;i++){
				obj[values[i].name] = values[i].value;
			}
			// console.log(obj);
			Post('/admin/create_user',obj,function(response){
				if(!response.error){
					_this.getAllUsers();
					$('#submit_new_user').attr("disabled",false);
					$('#create_user_modal').modal('hide');
				}else{
					alert(response.message);
					$('#submit_new_user').attr("disabled",false);
					$('#create_user_modal').modal('hide');
				}
			});
		});
    }
    
    this.getAllUsers = function(){
        Fetch('/admin/allusers',function(response){
            if(!response.error){
                _this.$el.append(user_table_Template({data : response.data}));
            }
        })
    }
}

var admin = new handleUsers();
$(document).ready(function(){
	HandlebarsTemplates();
	admin.getAllUsers();
	admin.createNewUser();
});