document.addEventListener('DOMContentLoaded', function(){

    let user = JSON.parse(localStorage.getItem("utente"));
    let tipoUtente = user.tipo;

    if(localStorage.getItem("utente") === null){
            window.location.href = "home.html"

    }else if((tipoUtente == "B")){
        window.location.href = "homeUtente.html"
    }
});

let modB = document.getElementById("modButton");

modB.addEventListener('click', (e) => {
	modificaEvento(e);
    document.getElementById("inputNom").value = ''
    document.getElementById("inputTip").value = ''
    document.getElementById("inputCar").value = ''
    document.getElementById("inputDes").value = ''
    document.getElementById("inputLuo").value = ''
    document.getElementById("inputIndi").value = ''
    document.getElementById("inputDis").value = ''
    document.getElementById("inputDat").value = ''
    document.getElementById("inputLoc").value = ''
    document.getElementById("inputBan").value = ''
    document.getElementById("inputLog").value = ''
    document.getElementById("inputPos").value = ''
});

    function modificaEvento(e){

        e.preventDefault();


    let urlParams = new URLSearchParams(window.location.search);
    let eventoId = urlParams.get('eventoID');

    let utenteID = "Amministratore";

    let URL = `http://localhost:9015/api/evento/utente/${utenteID}`;

    
   
    

    let eventoMod = {
        "eventoID" : eventoId,
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
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventoMod)
        
    })
        .then(response => {
            statusCode = response.status; 
            return response.json(); 
        })
        .then(e => {
            console.log(e);

        });

        mostraAlert("Evento modificato con successo!")

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