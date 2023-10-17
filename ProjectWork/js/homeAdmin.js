document.addEventListener('DOMContentLoaded', function(){
        if(localStorage.getItem("utente") === null){
                window.location.href = "home.html"
        }
});

let btnLogOut = document.querySelector("#btnLogOut");

function logOut(){
    
        localStorage.removeItem("utente");
        window.location.href = "home.html"
    
}

btnLogOut.addEventListener("click", logOut);