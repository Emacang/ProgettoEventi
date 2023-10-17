package it.pro.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import it.pro.entities.Prenotazioni;

public interface PrenotazioniDAO extends JpaRepository<Prenotazioni, Integer> {

	@Query("SELECT p from Prenotazioni p where p.eventoID=?1 and p.UserID=?2")
	Prenotazioni getPrenotazioni(int eventoID, String UserID);
	
	@Query("SELECT p from Prenotazioni p where p.UserID=?1")
	List<Prenotazioni> getPrenotazioniByUserID(String UserID);
}
