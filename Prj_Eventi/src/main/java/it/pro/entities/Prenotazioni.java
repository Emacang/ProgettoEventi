package it.pro.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Prenotazioni {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int prenotazioniId;
	
    private String UserID;
    private int eventoID;
    
	public int getPrenotazioniId() {
		return prenotazioniId;
	}
	public void setPrenotazioniId(int prenotazioniId) {
		this.prenotazioniId = prenotazioniId;
	}
	public String getUserID() {
		return UserID;
	}
	public void setUserID(String userID) {
		UserID = userID;
	}
	public int getEventoID() {
		return eventoID;
	}
	public void setEventoID(int eventoID) {
		this.eventoID = eventoID;
	}
    
    
	
	

}
