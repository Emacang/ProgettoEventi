document.addEventListener('DOMContentLoaded', function(){

    let user = JSON.parse(localStorage.getItem("utente"));
    let tipoUtente = user.tipo;

    if(localStorage.getItem("utente") === null){
            window.location.href = "home.html"

    }else if((tipoUtente == "B")){
        window.location.href = "homeUtente.html"
    }
});

let subB = document.getElementById("submitButton");

subB.addEventListener('click', (e) => {
	addEvento(e);
});

function addEvento(e) {

    e.preventDefault();

    let utenteID = "Amministratore";

    let URL = `http://localhost:9015/api/evento/utente/${utenteID}`;
   
    

    let nuovoEvento = {
        "nomeEvento": document.getElementById("inputNom").value,
        "tipologia": document.getElementById("inputTip").value,
        "caratteristiche": document.getElementById("inputCar").value,
        "descrizione": document.getElementById("inputDes").value,
        "luogoEvento": document.getElementById("inputLuo").value,
        "indirizzo": document.getElementById("inputIndi").value,
        "disponibilita": document.getElementById("inputDis").value,
        "dataEvento": document.getElementById("inputDat").value,
        "locandina": document.getElementById("inputLoc").value,
        "banner": document.getElementById("inputBan").value,
        "logo": document.getElementById("inputLog").value,
        "poster": document.getElementById("inputPos").value

    }


    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuovoEvento)
        
    })
        .then(response => {
            statusCode = response.status; 
            return response.json(); 
        })
        .then(evento => {
            console.log(evento);

        });

        mostraAlert("Nuovo evento aggiunto alla lista")

        setTimeout(function () {
            window.location.href = "amministraEventi.html"
        }, 1000);

}

function mostraAlert(message, type = 'success') {
    let alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`,'sticky-bottom', 'text-center', 'bottom-0', 'end-0', 'm-3');
    alertDiv.textContent = message;

    document.body.appendChild(alertDiv);

    setTimeout(function () {
        alertDiv.remove();
    }, 3000);
}