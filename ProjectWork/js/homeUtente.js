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
          }
        )}
)}
        
