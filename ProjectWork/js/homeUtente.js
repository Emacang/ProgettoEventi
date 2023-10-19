document.addEventListener('DOMContentLoaded', caricaEventi);
document.addEventListener('DOMContentLoaded', calendario)

function caricaEventi(){
    fetch('http://localhost:9015/api/evento')
    .then(response => response.json())
    .then(data =>{
        let listaEventi = document.querySelector('#listaEventi');

        data.forEach(evento => {

            // if(evento.disponibilita == "Disponibile"){

            let listItem = document.createElement('div');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                
            let eventoDet = document.createElement('div');
            eventoDet.classList.add('d-flex', 'align-items-center');
                
            let image = document.createElement('img');
            image.src = evento.logo;
            image.classList.add('mr-3', 'img-fluid');

            let name = document.createElement('a');
            name.href = `eventoSingolo.html?eventoID=${evento.eventoID}`
            name.textContent = evento.nomeEvento.toUpperCase();
                
            let addButton = document.createElement('button');
            addButton.classList.add('btn', 'btn-danger', 'btn-sm');
            addButton.textContent = 'Prenota';

                eventoDet.appendChild(image);
                eventoDet.appendChild(name);
                listItem.appendChild(eventoDet);
                listItem.appendChild(addButton);
                listaEventi.appendChild(listItem);

                addButton.addEventListener('click', function () {
                    inserPrenotazione(evento.eventoID);
                });
          }
        )}
)}

function calendario(){
    fetch('http://localhost:9015/api/evento')
    .then(response => response.json())
    .then(data =>{
        let listPast = document.querySelector('#listPast');
        let listFuture = document.querySelector('#listFuture')

        data.forEach(evento => {

            // if(evento.disponibilita == "Disponibile"){
                let oggi = new Date().getTime();
                let dataUtile = new Date(evento.dataEvento).getTime();

                if(dataUtile > oggi){

                    let listaCalendarioItemFuturo = document.createElement('div')
                    

            let listCalendarioItem = document.createElement('div');
            listCalendarioItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                
            let eventoDet = document.createElement('div');
            eventoDet.classList.add('d-flex', 'align-items-center');

            let name = document.createElement('a');
            name.href = `eventoSingolo.html?eventoID=${evento.eventoID}`
            name.innerHTML = evento.nomeEvento.toUpperCase();

                function formatDataItaliana(dataString) {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const dateAmericana = new Date(dataString);
                let dataIta = dateAmericana.toLocaleDateString('it-IT', options);

                dataIta = dataIta.replace(/(?:^|\s)\S/g, function(a) {
                return a.toUpperCase();
                });

                return dataIta
                }

                let dataAmericana = evento.dataEvento;
                let dataIta = formatDataItaliana(dataAmericana);

                
                

                let data = document.createElement('p')
                        data.classList.add('d-flex', 'justify-content-between')
                        data.innerHTML = `<span>${dataIta}</span>`

                
                eventoDet.appendChild(data);
                eventoDet.appendChild(name);
                listCalendarioItem.appendChild(eventoDet);
                listaCalendarioItemFuturo.appendChild(listCalendarioItem)
                listFuture.appendChild(listaCalendarioItemFuturo);

            }else{
                let listaCalendarioItemPassato = document.createElement('div')
                    

            let listCalendarioItem = document.createElement('div');
            listCalendarioItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                
            let eventoDet = document.createElement('div');
            eventoDet.classList.add('d-flex', 'align-items-center');

            let name = document.createElement('a');
            name.href = `eventoSingolo.html?eventoID=${evento.eventoID}`
            name.innerHTML = evento.nomeEvento.toUpperCase();

                function formatDataItaliana(dataString) {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const dateAmericana = new Date(dataString);
                let dataIta = dateAmericana.toLocaleDateString('it-IT', options);

                dataIta = dataIta.replace(/(?:^|\s)\S/g, function(a) {
                return a.toUpperCase();
                });

                return dataIta
                }

                let dataAmericana = evento.dataEvento;
                let dataIta = formatDataItaliana(dataAmericana);

                
                

                let data = document.createElement('p')
                        data.classList.add('d-flex', 'justify-content-between')
                        data.innerHTML = `<span>${dataIta}</span>`

                
                eventoDet.appendChild(data);
                eventoDet.appendChild(name);
                listCalendarioItem.appendChild(eventoDet);
                listaCalendarioItemPassato.appendChild(listCalendarioItem)
                listPast.appendChild(listaCalendarioItemPassato);
            }
          }
        )}
)}

function inserPrenotazione(eventoID) {

    

    if(localStorage.getItem("utente") === null){
                mostraAlert('Devi prima accedere', 'danger');

    }else{

        let user = JSON.parse(localStorage.getItem('utente'));
        let userid = user.userID;

        let nuovaPrenotazione = {
            "eventoID": eventoID,
            "userID": userid
        }

    let URL = `http://127.0.0.1:9015/api/prenotazioni`;

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuovaPrenotazione)
        
    })
        .then(response => {
            // statusCode = response.status; // salvo lo status della response
            return response.json(); // restituisco il json convertito
        })
        .then(prenotazioni => {
            console.log(prenotazioni);
            if(prenotazioni.prenotazioniId == 0){
                mostraAlert('Prenotazione già effettuata in precedenza', 'danger')
            }else{
                mostraAlert('Prenotazione effettuata con successo');
            }

        });

    }
    
    

}

// function inserPrenotazione(evento) {
//     let prenotazioni = JSON.parse(localStorage.getItem('prenotazioni')) || [];
//     if(localStorage.getItem("utente") === null){
//         mostraAlert('Devi prima accedere', 'danger');
//     }
//     else if (!prenotazioni.includes(evento)) {
//         prenotazioni.push(evento);
//         localStorage.setItem('prenotazioni', JSON.stringify(prenotazioni));
//         mostraAlert('Prenotazione effettuata con successo');
//     }else{
//         mostraAlert('Prenotazione già effettuata in precedenza', 'danger');
//     }
    
// }

function mostraAlert(message, type = 'success') {
    let alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`,'sticky-bottom', 'text-center', 'bottom-0', 'end-0', 'm-3');
    alertDiv.textContent = message;

    document.body.appendChild(alertDiv);

    setTimeout(function () {
        alertDiv.remove();
    }, 3000);
}
        
