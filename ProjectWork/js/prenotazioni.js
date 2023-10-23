document.addEventListener('DOMContentLoaded', caricaPrenotazioni);

let btnLogOut = document.querySelector("#btnLogOut");

function logOut(){

    localStorage.removeItem("utente");
    window.location.href = "home.html"

}

btnLogOut.addEventListener("click", logOut);

document.addEventListener('DOMContentLoaded', function(){

    let user = JSON.parse(localStorage.getItem("utente"));
    let tipoUtente = user.tipo;

    if(localStorage.getItem("utente") === null){
            window.location.href = "home.html"
    }else if((tipoUtente == "A")){
        window.location.href = "homeAdmin.html"
    }
});

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
                            <div class="card h-75 text-center mt-5 py-4" style="border-color: black;">
                            <h2><i class="fa-solid fa-face-grin-beam-sweat display-1"></i><br>Non sono presenti prenotazioni all'attivo</h2>
                            </div>
                         `
                     ;

                     vuoto.innerHTML = vuotoHtml;
                 prenotazioni.appendChild(vuoto);
            
        }else{
        mostraEventiPrenotati(data);}

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
            spanF2.classList.add('data-futuri', 'fs-5');
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
                
            btnCancella.addEventListener('click', function() {

                let prenotazioneId = btnCancella.getAttribute('data-id');
                eliminaPrenotazione(prenotazioneId);
                card.remove()

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