$("#btnExit").click(function(){
    sessionStorage.removeItem("user");

    if(sessionStorage.getItem("user") == null)
        window.location.href= "index.php"
    else
        console.log("Error de sesión")
});