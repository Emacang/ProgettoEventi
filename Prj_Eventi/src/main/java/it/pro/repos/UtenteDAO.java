package it.pro.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import it.pro.entities.Utente;

public interface UtenteDAO extends JpaRepository<Utente, String> {

}
