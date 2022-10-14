
function validation(){
    let email = $("#InpEmail").val();
    let username = $("#InpUser").val();
    let pass = $("#InpPassword").val();
    let pass2 = $("#InpConfirmPassword").val();

    if(email == "" || username == "" || pass == "")
    {
        $("#errorLabel").css("display", "block");
        return false;
    }else{
        if(pass != pass2){
            $("#errorLabel2").css("display", "block");
            return false;
        }else{
            return true;
        }

    }

}