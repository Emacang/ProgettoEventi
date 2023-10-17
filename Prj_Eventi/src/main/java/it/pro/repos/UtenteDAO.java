package it.pro.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import it.pro.entities.Utente;

public interface UtenteDAO extends JpaRepository<Utente, String> {
	
	Utente findByEmailAndPassword(String email, String password);

	
	@Query("SELECT u from Utente u where u.UserID=?1")
	Utente findByUserID(String UserID);
}
