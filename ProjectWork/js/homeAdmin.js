document.addEventListener('DOMContentLoaded', function(){
        if(localStorage.getItem("utente") === null){
                window.location.href = "home.html"
        }
});

let btnLogOut = document.querySelector("#btnLogOut");

// let userAdmin = JSON.parse(localStorage.getItem("utente"));
//           let nomeUtenteAdmin = `${userAdmin.nome} ${userAdmin.cognome}`

//           let dropdownAdmin = document.querySelector('#dropdownAdmin')
//               dropdownAdmin.innerHTML = nomeUtenteAdmin

function logOut(){
    
        localStorage.removeItem("utente");
        window.location.href = "home.html"
    
}

btnLogOut.addEventListener("click", logOut);