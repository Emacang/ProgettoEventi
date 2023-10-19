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
});

    function modificaEvento(e){

        e.preventDefault();


    let urlParams = new URLSearchParams(window.location.search);
    let eventoId = urlParams.get('eventoID');

    let utenteID = "Amministratore";

    let URL = `http://127.0.0.1:9015/api/evento/utente/${utenteID}`;

    
   
    

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
    }


    fetch(URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventoMod)
        
    })
        .then(response => {
            statusCode = response.status; // salvo lo status della response
            return response.json(); // restituisco il json convertito
        })
        .then(e => {
            console.log(e);

        });
   
    }