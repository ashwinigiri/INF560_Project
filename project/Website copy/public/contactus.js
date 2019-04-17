
function contactsubmit(){
    var email = document.getElementById("email");
    var name = document.getElementById("name");
    var phno = document.getElementById("phno");
    var message = document.getElementById("message")
    var contdiv = document.getElementById("maindiv");
    var successdiv = document.getElementById("hidediv");
    var firebaseref = firebase.database().ref().child("contactus");
    var nameval = name.value;
    var emailval = email.value;
    var phval = phno.value;
    var msgval = message.value;
    firebaseref.push().set({
        fullname: nameval,
        emailaddress: emailval,
        phonenumber: phval,
        messagebody: msgval
      });

      contdiv.style.display = "none";
      successdiv.style.display = "block";
}
