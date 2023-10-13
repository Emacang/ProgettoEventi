let signUpButton = document.getElementById('signUp');
let signInButton = document.getElementById('signIn');
let container = document.getElementById('container');

let loginButton = document.getElementById('login');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

loginButton.addEventListener('click', (e) => {
	logIn(e);
});



function logIn(e) {

	e.preventDefault();

	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;

	fetch("http://localhost:9015/api/login", {
		method: "POST",
		body: JSON.stringify({
			email: email,
			password: password
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	})
	.then(response => response.json())
	.then(json => {
		if (json.esito == "ok"){
		sessionStorage.setItem("utente", JSON.stringify(json.utente));
	} else {
		throw "utente non registrato"
	}
	})
	.catch(err => console.log(err))

}