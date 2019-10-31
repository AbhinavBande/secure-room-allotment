function validate(){
    var un = document.getElementById("signin-username");
    var pass = document.getElementById("sign-password");
    if(un.value.length !== 9){
        alert("Invalid Username");
        un.focus();
        un.style.border = "3px solid #F1948A";
        return false;
    }
    var number = /^\d+$/;
    var letter = /^[A-Z]+$/;
    var c1 = 0;
    var s2 = un.value.substr(5,4);
    var t1=0;
    var t2=0;
    if(un.value.charAt(2).match(letter) && un.value.charAt(3).match(letter) && un.value.charAt(4).match(letter))
        t1++;
    if(number.test(s2))
        t2++;

    if( un.value.charAt(0).match(number) && un.value.charAt(1).match(number) && t1===1 && t2===1){
        c1++;
    }

    if(c1===0){
        alert ("Invalid username");
        un.focus();
        un.style.border = "3px solid #F1948A";
        return false;
    }
}