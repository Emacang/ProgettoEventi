       
        document.addEventListener('DOMContentLoaded', function() {
            let urlParams = new URLSearchParams(window.location.search);
            let eventoId = urlParams.get('eventoID');
  
            let user = JSON.parse(localStorage.getItem("utente"));
            let nomeUtente = `${user.nome} ${user.cognome}`
  
            let dropdown = document.querySelector('#dropdown')
                dropdown.innerHTML = nomeUtente
            
              fetch('http://localhost:9015/api/evento')
                .then(response => response.json())
                .then(data => {
  
                  data.forEach(evento => {
  
                      if(eventoId == evento.eventoID){
  
                          let intestazione = document.querySelector('#intestazione');
                          intestazione.innerHTML = evento.nomeEvento;
  
                          let dettagliEvento = document.querySelector('#dettagli-evento');
  
                          let item = document.createElement('div');
                          item.classList.add('col-lg-12')
  
                          let image = document.createElement('img');
                          image.classList.add('img-fluid', 'mt-5');
                          image.src = evento.banner;
  
                          let divNome = document.createElement('div')
                          divNome.classList.add('col-lg-12')
  
                          let nome = document.createElement('img')
                          nome.classList.add('img-fluid', 'mt-4','mb-4', 'logo-titolo')
                          nome.src = evento.logo;
  
                          let itemDesc = document.createElement('div')
                          itemDesc.classList.add('col-lg-8')
                          let desc = document.createElement('p')
                          desc.textContent = evento.descrizione;
  
                          let preno = document.createElement('button')
                          preno.classList.add('btn', 'btn-danger', 'mt-3', 'btnpreno')
                          preno.innerHTML = ('Prenota Ora')
  
                          let itemDet = document.createElement('div')
                          itemDet.classList.add('col-lg-4')
                          let det = document.createElement('p')
                          det.classList.add('stile-det')
                          det.textContent = 'Dettagli Evento';
  
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
                          // let dataD = new Date(dataAmericana)
                          // const giorno = dataD.getDate().toString().padStart(2, '0');
                          // const mese = (dataD.getMonth() + 1).toString().padStart(2, '0');
                          // const anno = dataD.getFullYear();
                          // let dataIta = `${giorno}-${mese}-${anno}`
                          let data = document.createElement('p')
                          data.classList.add('dettaglioEvento', 'd-flex', 'justify-content-between')
                          data.innerHTML = `<span>Data: </span><span>${dataIta}</span>`
              
                          
                          let cate = document.createElement('p')
                          cate.classList.add('dettaglioEvento', 'd-flex', 'justify-content-sm-between', 'flex-column', 'flex-sm-row')
                          cate.innerHTML = `<span>Caratteristica: </span><span>${evento.caratteristiche}</span>`
                          let tipo = document.createElement('p')
                          tipo.classList.add('dettaglioEvento', 'd-flex', 'justify-content-between')
                          tipo.innerHTML = `<span>Tipologia: </span><span>${evento.tipologia}</span>`
                          let luogo = document.createElement('p')
                          luogo.classList.add('dettaglioEventoLuogo', 'd-flex', 'justify-content-between')
                          luogo.innerHTML = `<span>Luogo: </span><span>${evento.luogoEvento}</span>`
                          let disp = document.createElement('p')
                          disp.classList.add('dettaglioEvento', 'd-flex', 'justify-content-between')
                          disp.innerHTML = `<span>Disponibilità: </span><span>${evento.disponibilita}</span>`
  
                          let divMap = document.createElement('div');
                          divMap.classList.add('d-flex')
                          divMap.setAttribute('id', 'map');
  
  
                          item.appendChild(image)
                          divNome.appendChild(nome)
                          itemDesc.appendChild(desc)
                          itemDesc.appendChild(preno)
                          itemDet.appendChild(det)
                          itemDet.appendChild(data)
                          itemDet.appendChild(cate)
                          itemDet.appendChild(tipo)
                          itemDet.appendChild(disp)
                          itemDet.appendChild(luogo)
                          itemDet.appendChild(divMap)
                          dettagliEvento.appendChild(item)
                          dettagliEvento.appendChild(divNome)
                          dettagliEvento.appendChild(itemDesc)
                          dettagliEvento.appendChild(itemDet)
  
                          preno.addEventListener('click', function () {
                          inserPrenotazione(evento.eventoID);
                          });
  
                          // let listItem = document.createElement('div');
                          // listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  
                          // let eventoDet = document.createElement('div');
                          // eventoDet.classList.add('d-flex', 'align-items-center');
  
                          // let image = document.createElement('img');
                          // image.src = evento.logo;
                          // image.classList.add('mr-3', 'img-fluid');
  
                          // let name = document.createElement('h5');
                          // name.textContent = evento.nomeEvento.toUpperCase();
  
                          // let addButton = document.createElement('button');
                          // addButton.classList.add('btn', 'btn-danger', 'btn-sm');
                          // addButton.textContent = 'Prenota';
  
                          // eventoDet.appendChild(image);
                          // eventoDet.appendChild(name);
                          // listItem.appendChild(eventoDet);
                          // listItem.appendChild(addButton);
                          // dettagliEvento.appendChild(listItem);
  
                          let map = L.map('map');
  
                          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            maxZoom: 19,
                            
                          }).addTo(map);
  
              
  
                          fetch('https://geocode.maps.co/search?q='+evento.indirizzo)
                            .then(response => response.json())
                            .then(data => {
                              console.log(data)
            
                              let lat = data[0].lat;
                              let lon = data[0].lon;
  
                              map.setView([lat, lon], 17);
  
                              // let customIcon = L.icon({
                              //    iconUrl: './img/map.png', // Inserisci il percorso al tuo file di icona
                              //    iconSize: [40, 40], // Imposta la dimensione dell'icona
                              //    iconAnchor: [20, 40], // Imposta l'ancoraggio dell'icona
                              //    popupAnchor: [0, -40] // Imposta l'ancoraggio del popup
                              //  });
            
                              let marker = L.marker([lat, lon]).addTo(map);
  
                            })
                                }
                })
              })
            
              function inserPrenotazione(eventoID) {
  
  
  
  if (localStorage.getItem("utente") === null) {
    mostraAlert('Devi prima accedere', 'danger');
  
  } else {
  
    // let user = JSON.parse(localStorage.getItem('utente'));
    let userid = user.userID;
  
    let nuovaPrenotazione = {
      "eventoID": eventoID,
      "userID": userid
    }
  
    let URL = `http://localhost:9015/api/prenotazioni`;
  
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
        if (prenotazioni.prenotazioniId == 0) {
          mostraAlert('Prenotazione già effettuata in precedenza', 'danger')
        } else {
          mostraAlert('Prenotazione effettuata con successo');
        }
  
      });
  
  }
  
  
  
  }
  
  function mostraAlert(message, type = 'success') {
    let alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`, 'sticky-bottom', 'text-center', 'bottom-0', 'end-0', 'm-3');
    alertDiv.textContent = message;
  
    document.body.appendChild(alertDiv);
  
    setTimeout(function () {
      alertDiv.remove();
    }, 3000);
  }
            
            }
          );
  
            