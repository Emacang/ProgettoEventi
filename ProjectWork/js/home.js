document.addEventListener('DOMContentLoaded', caricaEventi);
document.addEventListener('DOMContentLoaded', calendario);
document.addEventListener('DOMContentLoaded', eventiFuturi);

function caricaEventi(){
    fetch('http://localhost:9015/api/evento')
    .then(response => response.json())
    .then(data =>{
        let listaEventi = document.querySelector('#listaEventi');

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
                let dataD = new Date (evento.dataEvento)

                let dataAmericana = evento.dataEvento;
                let dataIta = formatDataItaliana(dataAmericana);

                if(dataD.getFullYear() != '2024'){

            let swiperSlide = document.createElement('div')
            swiperSlide.classList.add('swiper-slide');

            let card = document.createElement('div');
            card.classList.add('card', 'evento');

            let imgC = document.createElement('img');
            imgC.src = evento.poster;
            imgC.classList.add('card-img-top');

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let cardContent = document.createElement('div');
            cardContent.classList.add('card-content');
            cardContent.setAttribute('id', 'contenuti');

            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title', 'text-white');
            cardTitle.innerHTML = evento.nomeEvento;

            let cardText = document.createElement('p');
            cardText.classList.add('card-text', 'text-white');
            

            let spanB = document.createElement('span')
            let spanD = document.createElement('span')
            spanD.classList.add('data');
            spanD.innerHTML = dataIta;

            let a = document.createElement('a')
            a.href = `eventoSingoloNo.html?eventoID=${evento.eventoID}`
            a.classList.add('btn', 'btn-warning', 'btninfo')
            a.innerHTML = 'Info'

            spanB.appendChild(a)

            cardText.appendChild(spanB)
            cardText.appendChild(spanD)

            cardBody.appendChild(cardContent);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            
            
            card.appendChild(imgC);
            card.appendChild(cardBody);
            swiperSlide.appendChild(card);
            listaEventi.append(swiperSlide);}

          }
        )}
)}

function calendario(){
    fetch('http://localhost:9015/api/evento')
    .then(response => response.json())
    .then(data =>{
        let listPast = document.querySelector('#listPast');
        let listFuture = document.querySelector('#listFuture')

        let h4 = document.createElement('h4');
            h4.classList.add('my-5');
            h4.innerHTML = 'Eventi Disponibili'

        let h42 = document.createElement('h4');
            h42.classList.add('my-5');
            h42.innerHTML = 'Eventi Passati'

            listFuture.appendChild(h4);
            listPast.appendChild(h42);


        data.forEach(evento => {

                let oggi = new Date().getTime();
                let dataUtile = new Date(evento.dataEvento).getTime();
                let dataD = new Date (evento.dataEvento)

                if(dataUtile > oggi){

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
                        const nomeMese = dataD.toLocaleString('it-IT', { month: 'short' }).toUpperCase();;

            if(dataD.getFullYear() != '2024'){

            let divEvento = document.createElement('div');
            divEvento.classList.add('lEvento');

            let col1 = document.createElement('div');
            col1.classList.add('dataEvento');

            let spanM = document.createElement('span');
            spanM.classList.add('testoSopra');
            spanM.innerHTML = nomeMese;

            let spanG = document.createElement('span');
            spanG.classList.add('testoGiu');
            spanG.innerHTML = giorno;

            let col2 = document.createElement('div');
            col2.classList.add('linkEvento', 'text-black', 'tsa');

            let article = document.createElement('article');
            article.classList.add('descrizioneData-Lato');

            let divDesc = document.createElement('div');
            divDesc.classList.add('descrizioneData-Latob');

            let spanDesc = document.createElement('span');
            spanDesc.classList.add('descrizioneData')
            spanDesc.innerHTML = dataIta;

            let titoloCal = document.createElement('a');
            titoloCal.classList.add('titoloCalendario');
            titoloCal.innerHTML = evento.nomeEvento;
            titoloCal.href = `eventoSingoloNo.html?eventoID=${evento.eventoID}`;

            divDesc.appendChild(spanDesc)
            article.appendChild(divDesc);
            article.appendChild(titoloCal)
            col2.appendChild(article)

            col1.appendChild(spanM);
            col1.appendChild(spanG);

            divEvento.appendChild(col1)
            divEvento.appendChild(col2)
            
            
            listFuture.appendChild(divEvento)
            }

            }else{

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


            let divEvento1 = document.createElement('div');
            divEvento1.classList.add('lEvento');

            let col3 = document.createElement('div');
            col3.classList.add('dataEvento');

            let spanM2 = document.createElement('span');
            spanM2.classList.add('testoSopra');
            spanM2.innerHTML = nomeMese;

            let spanG2 = document.createElement('span');
            spanG2.classList.add('testoGiu');
            spanG2.innerHTML = giorno;

            let col4 = document.createElement('div');
            col4.classList.add('linkEvento', 'text-black', 'tsa');

            let article2 = document.createElement('article');
            article2.classList.add('descrizioneData-Lato');

            let divDesc2 = document.createElement('div');
            divDesc2.classList.add('descrizioneData-Latob');

            let spanDesc2 = document.createElement('span');
            spanDesc2.classList.add('descrizioneData')
            spanDesc2.innerHTML = dataIta;

            let titoloCal2 = document.createElement('a');
            titoloCal2.classList.add('titoloCalendario');
            titoloCal2.innerHTML = evento.nomeEvento;
            titoloCal2.href = `eventoSingoloNo.html?eventoID=${evento.eventoID}`;

            divDesc2.appendChild(spanDesc2)
            article2.appendChild(divDesc2);
            article2.appendChild(titoloCal2)
            col4.appendChild(article2)

            col3.appendChild(spanM2);
            col3.appendChild(spanG2);

            
            divEvento1.appendChild(col3)
            divEvento1.appendChild(col4)
            
            
            listPast.appendChild(divEvento1)
            }
          }
        )}
)}

function eventiFuturi(){
    fetch('http://localhost:9015/api/evento')
    .then(response => response.json())
    .then(data =>{

        let listaConcerti = document.querySelector('#tabConcerti');
        let listaLibri = document.querySelector('#tabLibri');

        data.forEach(evento => {

                let tipoEv = evento.tipologia;
                let oggi = new Date().getTime();
                let dataUtile = new Date(evento.dataEvento).getTime();
                let dataD = new Date (evento.dataEvento)

                if(tipoEv = "Concerto" && tipoEv != "Cinema" && tipoEv != "Rassegna Letteraria" && dataD.getFullYear() == '2024'){

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
            divCol.classList.add('col-lg-6');

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
            btnInfo.href = `eventoSingoloNo.html?eventoID=${evento.eventoID}`
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
            listaConcerti.appendChild(divCol)



            }else if(tipoEv = "Rassegna Letteraria" && tipoEv != "Cinema" && tipoEv != "Concerto" && dataD.getFullYear() == '2024'){

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

                        let divCol1 = document.createElement('div')
                        divCol1.classList.add('col-lg-6');
            
                        let cardEventoFu1 = document.createElement('div');
                        cardEventoFu1.classList.add('card', 'evento');
            
                        let imgPoster1 = document.createElement('img');
                        imgPoster1.classList.add('card-img-top');
                        imgPoster1.src = evento.poster;
            
                        let cardBody1 = document.createElement('div');
                        cardBody1.classList.add('card-body')
            
                        let divCardCon1 = document.createElement('div');
                        divCardCon1.classList.add('card-content');
            
                        let cardTit1 = document.createElement('h5');
                        cardTit1.classList.add('card-title', 'text-black', 'd-flex', 'justify-content-between')
                        cardTit1.innerHTML = evento.nomeEvento;
            
                        let pCardText1 = document.createElement('p');
                        pCardText1.classList.add('card-text');
            
                        let spanF3 = document.createElement('span');
                        let spanF4 = document.createElement('span');
                        spanF4.classList.add('data-futuri');
                        spanF4.innerHTML = dataIta
            
                        let btnInfo1 = document.createElement('a')
                        btnInfo1.classList.add('btn', 'btn-warning','btnleggi');
                        btnInfo1.href = `eventoSingoloNo.html?eventoID=${evento.eventoID}`
                        btnInfo1.innerHTML = 'Leggi'
            
            
                        spanF3.appendChild(btnInfo1)
                        pCardText1.appendChild(spanF3)
                        pCardText1.appendChild(spanF4)
                        divCardCon1.appendChild(cardTit1);
                        divCardCon1.appendChild(pCardText1)
                        cardBody1.appendChild(divCardCon1);
                        cardEventoFu1.appendChild(imgPoster1);
                        cardEventoFu1.appendChild(cardBody1);
                        divCol1.appendChild(cardEventoFu1);
                        listaLibri.appendChild(divCol1)
            }
          }
        )}
)}

function inserPrenotazione(eventoID) {

    

    if(localStorage.getItem("utente") === null){
                mostraAlert('Devi prima accedere', 'danger');

    }else{

        let user = JSON.parse(localStorage.getItem('utente'));
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
            
            return response.json(); 
        })
        .then(prenotazioni => {
            console.log(prenotazioni);
            if(prenotazioni.prenotazioniId == 0){
                mostraAlert('Prenotazione già effettuata in precedenza', 'danger')
            }else{
                mostraAlert('Prenotazione effettuata con successo');
            }

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