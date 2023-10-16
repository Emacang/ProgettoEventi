submitButton.getElementById("submitButton");

submitButton.addEventListener('click', (e) => {
	addEvento(e);
});

function addEvento(e) {

    e.preventDefault();

    let URL = "http://localhost:9015/api/evento";
   
    

    let nuovoEvento = {
        "tipologia": document.getElementById("inputTip").value,
        "caratteristiche": document.getElementById("inputCar").value,
        "descrizione": document.getElementById("inputDes").value,
        "luogoEvento": document.getElementById("inputLuo").value,
        "disponibilita": document.getElementById("inputDis").value,
        "dataEvento": document.getElementById("inputDat").value,
        "locandina": document.getElementById("inputLoc").value,
        "banner": document.getElementById("inputBan").value,
        "logo": document.getElementById("inputLog").value

    }


    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuovoEvento)
        
    })
        .then(response => {
            statusCode = response.status; // salvo lo status della response
            return response.json(); // restituisco il json convertito
        })
        .then(evento => {
            console.log(nuovoEvento);

        });

}