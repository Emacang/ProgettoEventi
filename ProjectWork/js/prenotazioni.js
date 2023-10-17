document.addEventListener('DOMContentLoaded', function () {
    let listaPrenotazioni = document.getElementById('prenotazioni');

    let prenotazioni = JSON.parse(localStorage.getItem('prenotazioni')) || [];

    if(localStorage.getItem("prenotazioni") === null){


        let vuoto = document.createElement('div');
                vuoto.classList.add('text-center', 'mb-4');

                let vuotoHtml = 
                `
                            <div class="card h-100 p-0 text-center mt-5" style="border-color: black;">
                              Non hai prenotazioni all'attivo       
                            </div>
                        `
                    ;

                    

                vuoto.innerHTML = vuotoHtml;
                listaPrenotazioni.appendChild(vuoto);


    }else{

    prenotazioni.forEach(idEvento => {
        fetch(`http://localhost:9015/api/evento/${idEvento}`)
            .then(response => response.json())
            .then(data => {
                let card = document.createElement('div');
                card.classList.add('col-md-4', 'mb-4');

                let cardHtml = 
                `
                            <div class="card h-100 p-0 text-center mt-5" style="border-color: black;">
                              <img class="card-img-top w-25 m-5 mx-auto" src="${data.locandina}" alt="Title">
                              <div class="card-body" style="background-color: #ff0000;">
                                <h4 class="card-title" style="color: white;">${data.nomeEvento}</h4>
                                <button class="btn btn-danger btn-sm" id="btnCancella" data-id="${idEvento}"> Cancella </button>
                              </div>              
                            </div>
                        `
                    ;

                    

                card.innerHTML = cardHtml;
                listaPrenotazioni.appendChild(card);


                const btnCancella = card.querySelector('#btnCancella');
                
                btnCancella.addEventListener('click', function() {
                const idDaCancellare = btnCancella.getAttribute('data-id');
                prenotazioni = prenotazioni.filter(id => id !== idDaCancellare);
                localStorage.setItem('prenotazioni', JSON.stringify(prenotazioni));
                card.remove();
            });

                
            });
    });
}
});

