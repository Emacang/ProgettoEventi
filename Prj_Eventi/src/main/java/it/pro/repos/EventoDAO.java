package it.pro.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import it.pro.entities.Evento;

public interface EventoDAO extends JpaRepository<Evento, Integer> {

}
