package it.pro.services;

import java.util.List;

import it.pro.entities.Utente;

public interface UtenteService {
	
	List<Utente> getAll();
	Utente getUtente(String UserID);
	Utente add(Utente u);
	Utente findByEmailAndPassword(String email, String password);

}
