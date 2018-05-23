function authentication(){
	var _this = this;
	this.login = function(){
		$('#login-form').on('submit',function(e){
			e.preventDefault();
			var data = {
				email : $('#inputEmail').val(),
				password : $('#inputPassword').val(),
			};
			_this.tryLogin(data);
		});
	};
	this.tryLogin = function(data){
		$.ajax({
			url : "/auth/login",
			method : "POST",
			data : data,
			success : function(result){
				if(result.data._id && result.data.role == 'admin'){
					window.location.href = "/admin";
				}else if(result.data._id && result.role !== 'admin' ){
					window.location.href = "/user";
				}
			}
		});
	};
	this.resetpassword = function(){
		$('#reset').on('click',function(e){
			e.preventDefault();
			swal({
			  title: "Forgot Password ?",
			  text: "Enter your email to get a link.",
			  type: "input",
			  showCancelButton: true,
			  closeOnConfirm: false,
			  animation: "slide-from-top",
			  inputPlaceholder: "khaleesi@got.com"
			},
			function(inputValue){
			  if (inputValue === false) return false;

			  if (inputValue === "") {
			    swal.showInputError("We need your email!");
			    return false
			  }

				$.ajax({
					url : "/auth/reset-password-request",
					method : "POST",
					data : {email : inputValue},
					success : function(result){
						if(result.success){
							swal("All set!", "Head to your inbox to get the reset link.", "success");
						} else {
							swal("Oops!", "Didn't work. Please try again!\nYou can contact us at newsrain.in@gmail.com", "error");
						}
					}
				});
			});
		});
	};
}
var auth = new authentication();
$(document).ready(function(){
	auth.login();
	auth.resetpassword();
});
