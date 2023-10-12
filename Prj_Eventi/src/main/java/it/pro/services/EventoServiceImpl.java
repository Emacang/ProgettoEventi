package it.pro.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.pro.entities.Evento;
import it.pro.repos.EventoDAO;

@Service
public class EventoServiceImpl implements EventoService {
	
	@Autowired
	EventoDAO dao;

	@Override
	public List<Evento> getAll() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public Evento getEventoById(int eventoID) {
		// TODO Auto-generated method stub
		return dao.getReferenceById(eventoID);
	}

	@Override
	public Evento add(Evento e) {
		// TODO Auto-generated method stub
		return dao.save(e);
	}

}
