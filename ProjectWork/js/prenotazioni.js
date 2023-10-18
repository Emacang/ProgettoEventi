// document.addEventListener('DOMContentLoaded', function () {
//     let listaPrenotazioni = document.getElementById('prenotazioni');

//     let prenotazioni = JSON.parse(localStorage.getItem('prenotazioni')) || [];

//     if(localStorage.getItem("prenotazioni") === null){


//         let vuoto = document.createElement('div');
//                 vuoto.classList.add('text-center', 'mb-4');

//                 let vuotoHtml = 
//                 `
//                             <div class="card h-100 p-0 text-center mt-5" style="border-color: black;">
//                               Non hai prenotazioni all'attivo       
//                             </div>
//                         `
//                     ;

                    

//                 vuoto.innerHTML = vuotoHtml;
//                 listaPrenotazioni.appendChild(vuoto);


//     }else{

//     prenotazioni.forEach(idEvento => {
//         fetch(`http://localhost:9015/api/evento/${idEvento}`)
//             .then(response => response.json())
//             .then(data => {
//                 let card = document.createElement('div');
//                 card.classList.add('col-md-4', 'mb-4');

//                 let cardHtml = 
//                 `
//                             <div class="card h-100 p-0 text-center mt-5" style="border-color: black;">
//                               <img class="card-img-top w-25 m-5 mx-auto" src="${data.locandina}" alt="Title">
//                               <div class="card-body" style="background-color: #ff0000;">
//                                 <h4 class="card-title" style="color: white;">${data.nomeEvento}</h4>
//                                 <button class="btn btn-danger btn-sm" id="btnCancella${idEvento}" data-id="${idEvento}"> Cancella </button>
//                               </div>              
//                             </div>
//                         `
//                     ;

                    

//                 card.innerHTML = cardHtml;
//                 listaPrenotazioni.appendChild(card);


//                 const btnCancella = card.querySelector(`#btnCancella${idEvento}`);
                
//                 btnCancella.addEventListener('click', function() {
//                 const idDaCancellare = btnCancella.getAttribute('data-id');
//                 prenotazioni = prenotazioni.filter(id => id !== idDaCancellare);
//                 localStorage.removeItem('prenotazioni');
//                 localStorage.setItem('prenotazioni', JSON.stringify(prenotazioni));
//                 card.remove();
//             });

                
//             });
//     });
// }
// });

document.addEventListener('DOMContentLoaded', caricaPrenotazioni);

let user = JSON.parse(localStorage.getItem("utente"));
let idUtente = user.userID;

function caricaPrenotazioni(){
    fetch(`http://localhost:9015/api/prenotazioni/utente/${idUtente}`)
    .then(response => response.json())
    .then(data =>{


        mostraEventiPrenotati(data);
        // let listaPrenotazioni = document.querySelector('#prenotazioni');

        // data.forEach(evento => {

        //     let card = document.createElement('div');
        //         card.classList.add('col-md-4', 'mb-4');

        //         let cardHtml = 
        //         `
        //                     <div class="card h-100 p-0 text-center mt-5" style="border-color: black;">
        //                       <img class="card-img-top w-25 m-5 mx-auto" src="${evento.locandina}" alt="Title">
        //                       <div class="card-body" style="background-color: #ff0000;">
        //                         <h4 class="card-title" style="color: white;">${evento.nomeEvento}</h4>
        //                         <button class="btn btn-danger btn-sm" id="btnCancella"> Cancella </button>
        //                       </div>              
        //                     </div>
        //                 `
        //             ;

        //             card.innerHTML = cardHtml;
        //         listaPrenotazioni.appendChild(card);

            // if(evento.disponibilita == "Disponibile"){

            // let listItem = document.createElement('div');
            // listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                
            // let eventoDet = document.createElement('div');
            // eventoDet.classList.add('d-flex', 'align-items-center');
                
            // let image = document.createElement('img');
            // image.src = evento.logo;
            // image.classList.add('mr-3', 'img-fluid');

            // let name = document.createElement('a');
            // name.href = `eventoSingolo.html?eventoID=${evento.eventoID}`
            // name.textContent = evento.nomeEvento.toUpperCase();
                
            // let addButton = document.createElement('button');
            // addButton.classList.add('btn', 'btn-danger', 'btn-sm');
            // addButton.textContent = 'Prenota';

            //     eventoDet.appendChild(image);
            //     eventoDet.appendChild(name);
            //     listItem.appendChild(eventoDet);
            //     listItem.appendChild(addButton);
            //     listaEventi.appendChild(listItem);

            //     addButton.addEventListener('click', function () {
            //         inserPrenotazione(evento.eventoID);
            //     });
          }
        )}


function mostraEventiPrenotati(prenotazioni) {
    prenotazioni.forEach(prenotazione => {
        // Ottieni l'ID dell'evento prenotato da ciascuna prenotazione
        let eventoId = prenotazione.eventoID;

        // Esegui una richiesta per ottenere i dettagli dell'evento
        fetch(`http://localhost:9015/api/evento/${eventoId}`)
            .then(response => response.json())
            .then(data => {
                // Data conterrà i dettagli dell'evento
                // Ora puoi creare elementi HTML per mostrare l'evento
                mostraDettagliEvento(data);
            })
            .catch(error => {
                console.error('Errore nella richiesta dei dettagli dell\'evento:', error);
            });
    });
}

function mostraDettagliEvento(evento) {

    let listaPrenotazioni = document.querySelector('#prenotazioni');

    let card = document.createElement('div');
                card.classList.add('col-md-4', 'mb-4');

                let cardHtml = 
                `
                            <div class="card h-100 p-0 text-center mt-5" style="border-color: black;">
                              <img class="card-img-top w-25 m-5 mx-auto" src="${evento.locandina}" alt="Title">
                              <div class="card-body" style="background-color: #ff0000;">
                                <h4 class="card-title" style="color: white;">${evento.nomeEvento}</h4>
                                <button class="btn btn-danger btn-sm" id="btnCancella${evento.eventoID}"> Cancella </button>
                              </div>              
                            </div>
                        `
                    ;

                    card.innerHTML = cardHtml;
                listaPrenotazioni.appendChild(card);

                const btnCancella = card.querySelector(`#btnCancella${evento.eventoID}`);
                
                btnCancella.addEventListener('click', function() {

                    const prenotazioneId = evento.eventoID;

                    eliminaPrenotazione(prenotazioneId);
                    card.remove()
                // const idDaCancellare = btnCancella.getAttribute('data-id');
                // prenotazioni = prenotazioni.filter(id => id !== idDaCancellare);
                // localStorage.removeItem('prenotazioni');
                // localStorage.setItem('prenotazioni', JSON.stringify(prenotazioni));
                // card.remove();
            });

            function eliminaPrenotazione(prenotazioneId) {
                // Invia una richiesta di eliminazione al tuo backend
                fetch(`http://localhost:9015/api/prenotazioni/${prenotazioneId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.status === 200) {
                        // Rimuovi la prenotazione dall'HTML (opzionale)
                        const prenotazioneDaRimuovere = document.querySelector(`[data-id="${prenotazioneId}"]`);
                        if (prenotazioneDaRimuovere) {
                            prenotazioneDaRimuovere.remove();
                        }
                    } else if (response.status === 404) {
                        console.log('Prenotazione non trovata');
                    } else {
                        console.log('Errore durante l\'eliminazione della prenotazione');
                    }
                })
                .catch(error => {
                    console.error('Errore durante la richiesta di eliminazione:', error);
                });
            }


    // const listaEventiPrenotati = document.getElementById('listaEventiPrenotati');

    // const eventoElement = document.createElement('div');
    // eventoElement.classList.add('evento-prenotato');

    // eventoElement.innerHTML = `
    //     <h3>${evento.nomeEvento}</h3>
    //     <p>Data: ${evento.dataEvento}</p>
    //     <p>Luogo: ${evento.luogoEvento}</p>
    // `;

    // listaEventiPrenotati.appendChild(eventoElement);
}
