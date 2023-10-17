package it.pro.services;

import java.util.List;
import java.util.Optional;

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
//		return dao.findById(eventoID).get();
		
       Optional<Evento> opt = dao.findById(eventoID);	
       if(opt.isEmpty()) {
    	   return new Evento();
       }else {
    	   return opt.get();
       }
		
	}

	@Override
	public Evento add(Evento e) {
		// TODO Auto-generated method stub
		return dao.save(e);
	}

}
