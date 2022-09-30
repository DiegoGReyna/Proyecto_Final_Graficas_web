import User from '../model/user';

$("#btnSubmit").click(function(e){

    valid = true;

    let email = $("#InpEmail").val();
    let username = $("#InpUser").val();
    let pass = $("#InpPassword").val();

    var user = new User(email,username,pass);
    //checar base de datos correo

    //si todo bien, dirigir a iniciar sesión
    window.location.href= "index.html";

    if(valid){
        e.preventDefault();
    }
});