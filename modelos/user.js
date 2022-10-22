class User{

    constructor(iemail,iusername,ipassword){
        this.email = iemail;
        this.password = ipassword;
        this.username = iusername;
    }
    
    static logIn(iemail, ipassword){
        return new User(iemail, "", ipassword);
    }
}