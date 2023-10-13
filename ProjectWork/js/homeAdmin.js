let btnLogOut = document.querySelector("#btnLogOut");

function logOut(){
    
        console.log("culo");
        sessionStorage.clear;
        window.location.href = "Home.html"
    
}

btnLogOut.addEventListener("click", logOut());