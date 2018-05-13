

firebase.auth().onAuthStateChanged(function log(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
	
    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
	  var usernm = user.email;
	  document.getElementById("showusern").innerHTML = usernm;
		
    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
   
});

/*
firebase.auth().onAuthStateChanged(function shusername(user) {
	
	var usern = user.email;
	document.getElementById("showusern").innerHTML = usern;
	
	
});
*/




function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}



function logout(){
  firebase.auth().signOut();
  window.open("login.html",  target="_self");
}
