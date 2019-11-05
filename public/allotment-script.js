function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var d = ("0" + today.getDate()).slice(-2);
    var mn = ("0" + (today.getMonth() + 1)).slice(-2);
    var y = today.getFullYear();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('put-time').innerHTML =
        h + ":" + m + ":" + s;
    document.getElementById('put-date').innerHTML =
        d + "-" + mn + "-" + y;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


function logout() {
    window.location = "/logout";
}

function proceed(){
    var f1c1 = document.getElementById("f1-ac-class");
    var f1c2 = document.getElementById("f1-nac-class");
    var f2c1 = document.getElementById("f2-ac-class");
    var f2c2 = document.getElementById("f2-nac-class");
    var f3c1 = document.getElementById("f3-ac-class");
    var f3c2 = document.getElementById("f3-nac-class");
    var c1=0;
    var c2=0;
    var c3=0;
    if(f1c1.checked===true||f1c2.checked===true){
        c1++;
    }
    if(f2c1.checked===true||f2c2.checked===true){
        c2++;
    }
    if(f3c1.checked===true||f3c2.checked===true){
        c3++;
    }
    var cond1 =0;
    if(c1>0 && c2>0 && c3>0){
        cond1++;
        document.getElementById("optionsform").submit();
    }
    else{
        alert("Please select your class");
    }
    
    // var f1str = document.getElementById("f1-room-str");
    // var f1blk = document.getElementById("f1-block");
    // var f2str = document.getElementById("f2-room-str");
    // var f2blk = document.getElementById("f2-block");
    // var f3str = document.getElementById("f3-room-str");
    // var f3blk = document.getElementById("f3-block");
    
    // var opt1 = [f1str, f1blk];
    // var opt2 = [f2str, f2blk];
    // var opt3 = [f3str, f3blk];
    
    // console.log(opt1);
    // console.log(opt2);
    // console.log(opt3);
    
    // var cond2 = 0;
    // if(JSON.stringify(opt1) === JSON.stringify(opt2)){
    //     alert("Your choice 1 and choice 2 are the same. Please change it.")
    //     cond2++;
    // }
    
    // else if(JSON.stringify(opt2) === JSON.stringify(opt3)){
    //     alert("Your choice 2 and choice 3 are the same. Please change it.")
    //     cond2++;
    // }
    
    // else if(JSON.stringify(opt1) === JSON.stringify(opt3)){
    //     alert("Your choice 1 and choice 3 are the same. Please change it.")
    //     cond2++;
    // }
    
    // if(cond1 === 1 && cond2 === 0 ){
    // }


}