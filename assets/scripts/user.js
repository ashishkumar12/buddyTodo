function HandlebarsTemplates(){
	var todo_card = $('#todo_card').html();
	todo_card_Template = Handlebars.compile(todo_card);
}

function handleTodo(){
    var _this = this;
    this.$el = $('#dashboard');
    this.to_me = $('#todos_assigned_to_me');
    this.by_me = $('#todos_assigned_by_me')
    
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
    
    this.getAllTodos = function(){
        Fetch('/user/getalltodo',function(response){
			if(!response.error){
				_this.to_me.empty();
				_this.by_me.empty();
				_this.to_me.append(todo_card_Template({data : response.data.assigned_to_me,template : "to_me"}));
				_this.by_me.append(todo_card_Template({data : response.data.assigned_by_me,template : "by_me"}));
				_this.toggleCompleteTask();
			}
        });
	}
	this.toggleCompleteTask = function(){
		$('.complete_task').on('click',function(){
			var id = $(this).data('task');
			Post(`/user/todo/${id}/submit`,{},function(response){
				if(!response.error){
					_this.getAllTodos();
				}else{
					console.log('error');
				}
			});
		});
	}
	this.createNewTodo = function(){
		$('#create_todo_form').submit(function(e){
			var values = $(this).serializeArray();
			$('#submit_new_todo').attr("disabled",true);
			e.preventDefault();
			var obj = {};
			for(var i = 0 ; i < values.length ;i++){
				obj[values[i].name] = values[i].value;
			}
			Post('/user/todo/create',obj,function(response){
				if(!response.error){
					_this.getAllTodos();
					$('#submit_new_todo').attr("disabled",false);
					$('#create_todo_modal').modal('hide');
				}else{
					alert(response.message);
				}
			});
		});
	}
}

var todo = new handleTodo();
$(document).ready(function(){
	HandlebarsTemplates();
	todo.getAllTodos();
	todo.createNewTodo();
});