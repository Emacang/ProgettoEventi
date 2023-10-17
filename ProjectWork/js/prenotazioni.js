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

function caricaPrenotazioni(){
    fetch('http://localhost:9015/api/prenotazioni/utente/Registrato1')
    .then(response => response.json())
    .then(data =>{
        let listaPrenotazioni = document.querySelector('#prenotazioni');

        data.forEach(evento => {

            let card = document.createElement('div');
                card.classList.add('col-md-4', 'mb-4');

                let cardHtml = 
                `
                            <div class="card h-100 p-0 text-center mt-5" style="border-color: black;">
                              <img class="card-img-top w-25 m-5 mx-auto" src="${evento.locandina}" alt="Title">
                              <div class="card-body" style="background-color: #ff0000;">
                                <h4 class="card-title" style="color: white;">${evento.nomeEvento}</h4>
                                <button class="btn btn-danger btn-sm" id="btnCancella"> Cancella </button>
                              </div>              
                            </div>
                        `
                    ;

                    card.innerHTML = cardHtml;
                listaPrenotazioni.appendChild(card);

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
)}
