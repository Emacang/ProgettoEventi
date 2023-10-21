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

let nomeUtente = `${user.nome} ${user.cognome}`
let dropdown = document.querySelector('#dropdown')
dropdown.innerHTML = nomeUtente

function caricaPrenotazioni(){
    fetch(`http://localhost:9015/api/prenotazioni/utente/${idUtente}`)
    .then(response => response.json())
    .then(data =>{


        if(data.length === 0){

            let vuoto = document.createElement('div');
                vuoto.classList.add('text-center', 'mb-5');

                let vuotoHtml = 
                `
                            <div class="card h-75 p-0 text-center mt-5" style="border-color: black;">
                            Non sono presenti prenotazioni all'attivo
                            </div>
                         `
                     ;

                     vuoto.innerHTML = vuotoHtml;
                 prenotazioni.appendChild(vuoto);
            
        }else{
        mostraEventiPrenotati(data);}

        
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
        
        let eventoId = prenotazione.eventoID;

        
        fetch(`http://localhost:9015/api/evento/${eventoId}`)
            .then(response => response.json())
            .then(data => {
                
                mostraDettagliEvento(data, prenotazione);
            })
            .catch(error => {
                console.error('Errore nella richiesta dei dettagli dell\'evento:', error);
            });
    });
}

function mostraDettagliEvento(evento, prenotazione) {

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

            let listaPrenotazioni = document.querySelector('#prenotazioni');

            let divCol = document.createElement('div')
            divCol.classList.add('col-lg-4');

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

            let btnCancella = document.createElement('button')
            btnCancella.classList.add('btn', 'btn-warning', 'btnCanc');
            btnCancella.setAttribute('id', `btnCancella${evento.eventoID}`);
            btnCancella.setAttribute('data-id', `${prenotazione.prenotazioniId}`)
            btnCancella.innerHTML = 'Disdici'


            spanF1.appendChild(btnCancella)
            pCardText.appendChild(spanF1)
            pCardText.appendChild(spanF2)
            divCardCon.appendChild(cardTit);
            divCardCon.appendChild(pCardText)
            cardBody.appendChild(divCardCon);
            cardEventoFu.appendChild(imgPoster);
            cardEventoFu.appendChild(cardBody);
            divCol.appendChild(cardEventoFu);
            listaPrenotazioni.appendChild(divCol)

    // let card = document.createElement('div');
    //             card.classList.add('col-md-4', 'mb-4');

    //             let cardHtml = 
    //             `
    //                         <div class="card h-100 p-0 text-center mt-5" style="border-color: black;">
    //                           <img class="card-img-top w-25 m-5 mx-auto" src="${evento.poster}" alt="Title">
    //                           <div class="card-body" style="background-color: #ff0000;">
    //                             <h4 class="card-title" style="color: white;">${evento.nomeEvento}</h4>
    //                             <button class="btn btn-danger btn-sm" id="btnCancella${evento.eventoID}" data-id="${prenotazione.prenotazioniId}"> Cancella </button>
    //                           </div>              
    //                         </div>
    //                     `
    //                 ;

    //                 card.innerHTML = cardHtml;
    //             listaPrenotazioni.appendChild(card);

    //             let btnCancella = card.querySelector(`#btnCancella${evento.eventoID}`);
                
                btnCancella.addEventListener('click', function() {

                    let prenotazioneId = btnCancella.getAttribute('data-id');
                    eliminaPrenotazione(prenotazioneId);
                    card.remove()


                // const idDaCancellare = btnCancella.getAttribute('data-id');
                // prenotazioni = prenotazioni.filter(id => id !== idDaCancellare);
                // localStorage.removeItem('prenotazioni');
                // localStorage.setItem('prenotazioni', JSON.stringify(prenotazioni));
                // card.remove();
            });

            function eliminaPrenotazione(prenotazioneId) {
                
                fetch(`http://localhost:9015/api/prenotazioni/${prenotazioneId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.status === 200) {

                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                        
                        let prenotazioneDaRimuovere = document.querySelector(`[data-id="${prenotazioneId}"]`);
                        if (prenotazioneDaRimuovere) {
                            prenotazioneDaRimuovere.remove();
                            
                        }

                        mostraAlert('Prenotazione cancellata con successo');
                    } else if (response.status === 404) {
                        console.log('Prenotazione non trovata');
                        mostraAlert('Prenotazione non trovata', 'danger');
                    } else {
                        console.log('Errore durante l\'eliminazione della prenotazione');
                        mostraAlert('Errore durante l\'eliminazione della prenotazione', 'danger');
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

function mostraAlert(message, type = 'success') {
    let alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`,'sticky-bottom', 'text-center', 'bottom-0', 'end-0', 'm-3');
    alertDiv.textContent = message;

    document.body.appendChild(alertDiv);

    setTimeout(function () {
        alertDiv.remove();
    }, 3000);
}
