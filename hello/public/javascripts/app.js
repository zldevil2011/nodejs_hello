function login(){
    //alert("click to login");
    var current_url = window.location;
    var username = $("#login_username").val();
    var password = $("#login_password").val();
    console.log(username);
    console.log(password);
    //alert("covert to the new link");
    $.ajax({
        type: "POST",
        "url": "/user/login",
        data:{username:username, password:password},
        dataType:"json",
        success:function(){
            alert("登陆成功");
            window.location.href = current_url;
        },
        error:function(){
            //alert(arguments[1]);
            alert("登陆失败，请检查用户名和密码");
        }
    });
    //window.location.href = "/user/login";
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
};
function blog_query(){
    var query_key = $("#search_key").val();
    window.location.href = "/query_blog?blog_key=" + query_key;
    //$.ajax({
    //    type:"POST",
    //    url:"/query_blog",
    //    data:{blog_key:query_key},
    //    dataType:"json",
    //    success:function(data){
    //        alert("find it");
    //    },
    //    error:function(){
    //        alert(arguments[1]);
    //    }
    //});
}
