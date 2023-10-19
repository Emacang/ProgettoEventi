package it.pro.services;

import java.util.List;

import it.pro.entities.Prenotazioni;

public interface PrenotazioniService {

	List<Prenotazioni> getAll();
	Prenotazioni getPrenotazioniById(int prenotazioniId);
	Prenotazioni add(Prenotazioni p);
	Prenotazioni getByPrenotazioni(Prenotazioni p);
	List<Prenotazioni> getPrenotazioniByUtenteId(String utenteID);
	
//	Prenotazioni deletePrenotazione(int prenotazioneId);
	
	Prenotazioni eliminaPrenotazione(int prenotazioneId);
	List<Prenotazioni> getPrenotazioniByEventoId(int eventoID);
	
}