document.addEventListener('DOMContentLoaded', caricaEventi);

document.addEventListener('DOMContentLoaded', function(){

    let user = JSON.parse(localStorage.getItem("utente"));
    let tipoUtente = user.tipo;

    if(localStorage.getItem("utente") === null){
            window.location.href = "home.html"

    }else if((tipoUtente == "B")){
        window.location.href = "homeUtente.html"
    }
});

let btnLogOut = document.querySelector("#btnLogOut");

function logOut(){

    localStorage.removeItem("utente");
    window.location.href = "home.html"

}

btnLogOut.addEventListener("click", logOut);

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

            let modButton = document.createElement('a');
            modButton.classList.add('btn', 'btn-primary', 'btn-sm');
            modButton.setAttribute('id', 'btnMod')
            modButton.href = `modificaEvento.html?eventoID=${evento.eventoID}`
            modButton.textContent = 'Modifica'

            let spanF1 = document.createElement('span');
            let spanF2 = document.createElement('span');
            spanF2.classList.add('data-futuri');
            

            let btnDele = document.createElement('button')
            btnDele.classList.add('btn', 'btn-danger','btn-sm', 'btnDel');
            btnDele.innerHTML = 'Elimina'


            spanF1.appendChild(btnDele)
            spanF2.appendChild(modButton)
            pCardText.appendChild(spanF1)
            pCardText.appendChild(spanF2)
            divCardCon.appendChild(cardTit);
            divCardCon.appendChild(pCardText)
            cardBody.appendChild(divCardCon);
            cardEventoFu.appendChild(imgPoster);
            cardEventoFu.appendChild(cardBody);
            divCol.appendChild(cardEventoFu);
            gestione.appendChild(divCol)

                btnDele.addEventListener('click', function () {
                    eliminaEvento(evento.eventoID);
                    divCol.remove()
                });
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
        
        let addBtn = document.createElement('a')
        addBtn.classList.add('btn', 'btn-primary', 'btn-sm', 'btnAddn');
        addBtn.href = `formEventoNuovo.html`
        addBtn.textContent = 'Aggiungi Evento'


            pCardText.appendChild(addBtn);            
            divCardCon.appendChild(pCardText)
            cardBody.appendChild(divCardCon);
            cardEventoFu.appendChild(cardBody);
            divCol.appendChild(cardEventoFu);
            gestione.appendChild(divCol)

    
    }

        
)}

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

function mostraAlert(message, type = 'success') {
    let alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`,'sticky-bottom', 'text-center', 'bottom-0', 'end-0', 'm-3');
    alertDiv.textContent = message;

    document.body.appendChild(alertDiv);

    setTimeout(function () {
        alertDiv.remove();
    }, 3000);
}     