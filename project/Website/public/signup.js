
document.getElementById("user_div").style.display = "none";
document.getElementById("login_div").style.display = "block";

function signup(){

 var userEmail = document.getElementById("email1").value;
 var userPass = document.getElementById("password1").value;
 firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
  if (userEmail!="" && userPass!="") {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    var email_id = userEmail;
    var res = email_id.split("@");
    document.getElementById("user_para").innerHTML = "Welcome User : " + res[0] +"!!";

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
}