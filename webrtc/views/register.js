(function() {
	
	const txtEmail = document.getElementById('txtEmail');
	const txtPass = document.getElementById('txtPass');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp = document.getElementById('btnSignUp');
	
	btnSignUp.addEventListener('click', e=> {
		
		const email = txtEmail.value;
		const pass 	= txtPass.value;
		const auth = firebase.auth();
		
		const promise = auth.createUserWithEmailAndPassword(email,pass);
		promise.catch(e => console.log(e.message));
		
		
		if(email && pass != null){
		alert("Sign up successfully!");
		}
		else {
			alert("Please enter your email and password to register!");
		}
	});
	
}());


