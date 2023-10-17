document.addEventListener('DOMContentLoaded', caricaEventi);

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

function inserPrenotazione(evento) {
    let prenotazioni = JSON.parse(localStorage.getItem('prenotazioni')) || [];
    if(localStorage.getItem("utente") === null){
        mostraAlert('Devi prima accedere', 'danger');
    }
    else if (!prenotazioni.includes(evento)) {
        prenotazioni.push(evento);
        localStorage.setItem('prenotazioni', JSON.stringify(prenotazioni));
        mostraAlert('Prenotazione effettuata con successo');
    }else{
        mostraAlert('Prenotazione già effettuata in precedenza', 'danger');
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
        
