function login(){
    alert("click to login");
    var username = $("#login_username").val();
    var password = $("#login_password").val();
    console.log(username);
    console.log(password);
    alert("covert to the new link");
    window.location.href = "/login";
}
function register(){
    alert("click to register");
    var username = $("#register_username").val();
    var password = $("#register_password").val();
    alert(username);
    alert(password);
    $.ajax({
        type: "POST",
        url: "/user/register",
        data: {register_username:username, register_password:password, title:"User_list"},
        dataType: "json",
        success:function(data) {
            alert("注册成功");
        },
        error:function(){
            alert(arguments[1]);
        }
    });
}
