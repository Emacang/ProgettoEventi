package it.pro.response;

import it.pro.entities.Utente;

public class LoginResponse {
	
	private Utente utente;
	private String esito;
	
	
	
	public LoginResponse(Utente utente, String esito) {
		super();
		this.utente = utente;
		this.esito = esito;
	}
	public Utente getUtente() {
		return utente;
	}
	public void setUtente(Utente utente) {
		this.utente = utente;
	}
	public String getEsito() {
		return esito;
	}
	public void setEsito(String esito) {
		this.esito = esito;
	}
	
	

}
