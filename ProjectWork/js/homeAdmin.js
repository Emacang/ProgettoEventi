let btnLogOut = document.querySelector("#btnLogOut");

function logOut(){
    
        localStorage.clear();
        window.location.href = "home.html"
    
}

btnLogOut.addEventListener("click", logOut);