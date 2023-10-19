package it.pro.services;

import java.util.List;

import it.pro.entities.Evento;

public interface EventoService {
	
	List<Evento> getAll();
	Evento getEventoById(int eventoID);
	Evento add(Evento e);
	
	Evento eliminaEvento(int eventoID);
	Evento mod(Evento e);
}
