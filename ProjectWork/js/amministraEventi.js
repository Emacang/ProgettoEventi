document.addEventListener('DOMContentLoaded', caricaEventi);

let user = JSON.parse(localStorage.getItem("utente"));
let nomeUtente = `${user.nome} ${user.cognome}`

let dropdown = document.querySelector('#dropdown')
dropdown.innerHTML = nomeUtente

function caricaEventi(){
    fetch('http://localhost:9015/api/evento')
    .then(response => response.json())
    .then(data =>{
        let gestione = document.querySelector('#gestione');
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
                
            let deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.setAttribute('data-id', `${evento.eventoID}`)
            deleteButton.textContent = 'Cancella';

            let modButton = document.createElement('a');
            modButton.classList.add('btn', 'btn-primary', 'btn-sm');
            modButton.setAttribute('id', 'btnMod')
            modButton.href = `modificaEvento.html?eventoID=${evento.eventoID}`
            // modButton.setAttribute('data-bs-toggle', 'modal')
            // modButton.setAttribute('data-bs-target', '#exampleModal')
            // modButton.setAttribute('data-id' , `${evento.eventoID}`)
            modButton.textContent = 'Modifica'

                eventoDet.appendChild(image);
                eventoDet.appendChild(name);
                listItem.appendChild(eventoDet);
                listItem.appendChild(modButton);
                listItem.appendChild(deleteButton);
                gestione.appendChild(listItem);

                deleteButton.addEventListener('click', function () {
                    eliminaEvento(evento.eventoID);
                    listItem.remove()
                });

                
                // btnMod.addEventListener('click', redirecta);


                // let btnSalva = document.querySelector('#btnSalva');
                // btnSalva.addEventListener('click', function () {
                    
                //     modificaEvento(evento.eventoID);
                // })
          }

          


        )
        
        let nuovoItem = document.createElement('div')
        nuovoItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        
        let addBtn = document.createElement('a')
        addBtn.classList.add('btn', 'btn-primary', 'btn-sm');
        addBtn.href = `formEventoNuovo.html`
        addBtn.textContent = 'Aggiungi Evento'

        nuovoItem.appendChild(addBtn);
        gestione.appendChild(nuovoItem);
    
    }

        
)}

// function redirecta(){
//     window.location.href = `modificaEvento.html?eventoID=${evento.eventoID}`
// }

function eliminaEvento(eventoID) {

    

    fetch(`http://localhost:9015/api/evento/${eventoID}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.status === 200) {
                        
                        let eventoDaRimuovere = document.querySelector(`[data-id="${eventoID}"]`);
                        if (eventoDaRimuovere) {
                            eventoDaRimuovere.remove();
                        }

                        mostraAlert('Evento cancellato con successo');
                    } else if (response.status === 404) {
                        console.log('Evento non trovato');
                        mostraAlert('Evento non trovato', 'danger');
                    } else {
                        console.log('Errore durante l\'eliminazione dell\'evento');
                        mostraAlert('Errore durante l\'eliminazione dell\'evento', 'danger');
                    }
                })
                .catch(error => {
                    console.error('Errore durante la richiesta di eliminazione:', error);
                });
    
    

}

// function modificaEvento(eventoID){



//     let utenteID = "Amministratore";

//     let URL = `http://localhost:9015/api/evento`;

//     let modEvId = document.querySelector(`[data-id="${eventoID}"]`)
   
    

//     let eventoMod = {
//         "eventoID" : modEvId,
//         "nomeEvento": document.getElementById("inputNom").value,
//         "tipologia": document.getElementById("inputTip").value,
//         "caratteristiche": document.getElementById("inputCar").value,
//         "descrizione": document.getElementById("inputDes").value,
//         "luogoEvento": document.getElementById("inputLuo").value,
//         "indirizzo": document.getElementById("inputIndi").value,
//         "disponibilita": document.getElementById("inputDis").value,
//         "dataEvento": document.getElementById("inputDat").value,
//         "locandina": document.getElementById("inputLoc").value,
//         "banner": document.getElementById("inputBan").value,
//         "logo": document.getElementById("inputLog").value,
//         "UserID": utenteID
//     }


//     fetch(URL, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(eventoMod)
        
//     })
//         .then(response => {
//             statusCode = response.status; // salvo lo status della response
//             return response.json(); // restituisco il json convertito
//         })
//         .then(eventoID => {
//             console.log(eventoID);

//         });
   
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
        