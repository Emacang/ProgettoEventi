document.addEventListener('DOMContentLoaded', caricaEventi);

let user = JSON.parse(localStorage.getItem("utente"));
let nomeUtente = `${user.nome} ${user.cognome}`

// let dropdown = document.querySelector('#dropdown')
// dropdown.innerHTML = nomeUtente

function caricaEventi(){
    fetch('http://localhost:9015/api/evento')
    .then(response => response.json())
    .then(data =>{
        let gestione = document.querySelector('#gestione');
        data.forEach(evento => {

            // if(evento.disponibilita == "Disponibile"){

            // let listItem = document.createElement('div');
            // listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                
            // let eventoDet = document.createElement('div');
            // eventoDet.classList.add('d-flex', 'align-items-center');
                
            // let image = document.createElement('img');
            // image.src = evento.poster;
            // image.classList.add('mr-3', 'img-fluid');

            // let name = document.createElement('a');
            // name.href = `eventoSingolo.html?eventoID=${evento.eventoID}`
            // name.textContent = evento.nomeEvento.toUpperCase();
                
            // let deleteButton = document.createElement('button');
            // deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            // deleteButton.setAttribute('data-id', `${evento.eventoID}`)
            // deleteButton.textContent = 'Cancella';

            // let modButton = document.createElement('a');
            // modButton.classList.add('btn', 'btn-primary', 'btn-sm');
            // modButton.setAttribute('id', 'btnMod')
            // modButton.href = `modificaEvento.html?eventoID=${evento.eventoID}`
            // modButton.setAttribute('data-bs-toggle', 'modal')
            // modButton.setAttribute('data-bs-target', '#exampleModal')
            // modButton.setAttribute('data-id' , `${evento.eventoID}`)
            // modButton.textContent = 'Modifica'

            //     eventoDet.appendChild(image);
            //     eventoDet.appendChild(name);
            //     listItem.appendChild(eventoDet);
            //     listItem.appendChild(modButton);
            //     listItem.appendChild(deleteButton);
            //     gestione.appendChild(listItem);

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

               
                let dataD = new Date(dataAmericana)
                const giorno = dataD.getDate().toString().padStart(2, '0');
                const nomeMese = dataD.toLocaleString('it-IT', { month: 'short' }).toUpperCase();

            let divCol = document.createElement('div')
            divCol.classList.add('col-lg-3');

            let cardEventoFu = document.createElement('div');
            cardEventoFu.classList.add('card', 'evento');

            let imgPoster = document.createElement('img');
            imgPoster.classList.add('card-img-top');
            imgPoster.src = evento.poster;

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body')

            let divCardCon = document.createElement('div');
            divCardCon.classList.add('card-content');

            let cardTit = document.createElement('h5');
            cardTit.classList.add('card-title', 'text-black', 'd-flex', 'justify-content-between')
            cardTit.innerHTML = evento.nomeEvento;

            let pCardText = document.createElement('p');
            pCardText.classList.add('card-text');

            let spanF1 = document.createElement('span');
            let spanF2 = document.createElement('span');
            spanF2.classList.add('data-futuri');
            spanF2.innerHTML = dataIta

            let btnInfo = document.createElement('a')
            btnInfo.classList.add('btn', 'btn-warning', 'btnleggi');
            btnInfo.href = `eventoSingolo.html?eventoID=${evento.eventoID}`
            btnInfo.innerHTML = 'Leggi'


            spanF1.appendChild(btnInfo)
            pCardText.appendChild(spanF1)
            pCardText.appendChild(spanF2)
            divCardCon.appendChild(cardTit);
            divCardCon.appendChild(pCardText)
            cardBody.appendChild(divCardCon);
            cardEventoFu.appendChild(imgPoster);
            cardEventoFu.appendChild(cardBody);
            divCol.appendChild(cardEventoFu);
            gestione.appendChild(divCol)

                // deleteButton.addEventListener('click', function () {
                //     eliminaEvento(evento.eventoID);
                //     listItem.remove()
                // });

                
                // btnMod.addEventListener('click', redirecta);


                // let btnSalva = document.querySelector('#btnSalva');
                // btnSalva.addEventListener('click', function () {
                    
                //     modificaEvento(evento.eventoID);
                // })
          }

          


        )

            let divCol = document.createElement('div')
            divCol.classList.add('col-lg-3');

            let cardEventoFu = document.createElement('div');
            cardEventoFu.classList.add('cardN', 'eventoN');

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-bodyN', 'mt-5')

            let divCardCon = document.createElement('div');
            divCardCon.classList.add('card-contentN');

            let pCardText = document.createElement('p');
            pCardText.classList.add('card-textN');
        
        // let nuovoItem = document.createElement('div')
        // nuovoItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        
        let addBtn = document.createElement('a')
        addBtn.classList.add('btn', 'btn-primary', 'btn-sm', );
        addBtn.href = `formEventoNuovo.html`
        addBtn.textContent = 'Aggiungi Evento'


            pCardText.appendChild(addBtn);            
            divCardCon.appendChild(pCardText)
            cardBody.appendChild(divCardCon);
            cardEventoFu.appendChild(cardBody);
            divCol.appendChild(cardEventoFu);
            gestione.appendChild(divCol)

        // nuovoItem.appendChild(addBtn);
        // gestione.appendChild(nuovoItem);
    
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
        