package it.pro.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.pro.entities.Prenotazioni;
import it.pro.repos.PrenotazioniDAO;

@Service
public class PrenotazioniServiceImpl implements PrenotazioniService {

	@Autowired
	private PrenotazioniDAO dao;
	
	
	@Override
	public List<Prenotazioni> getAll() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public Prenotazioni getPrenotazioniById(int prenotazioniId) {
		// TODO Auto-generated method stub
//		return dao.findById(prenotazioniId);
		
		Optional<Prenotazioni> opt = dao.findById(prenotazioniId);	
	       if(opt.isEmpty()) {
	    	   return new Prenotazioni();
	       }else {
	    	   return opt.get();
	       }
			
	}

	@Override
	public Prenotazioni add(Prenotazioni p) {
		// TODO Auto-generated method stub
		return dao.save(p);
	}

	@Override
	public Prenotazioni getByPrenotazioni(Prenotazioni p) {
		// TODO Auto-generated method stub
		return dao.getPrenotazioni(p.getEventoID(), p.getUserID());
	}

	@Override
	public List<Prenotazioni> getPrenotazioniByUtenteId(String utenteID) {
		// TODO Auto-generated method stub
		return dao.getPrenotazioniByUserID(utenteID);
	}
	
	public List<Prenotazioni> getPrenotazioniByEventoId(int eventoID) {
		// TODO Auto-generated method stub
		return dao.getPrenotazioniByEventoID(eventoID);
	}

	@Override
	public Prenotazioni eliminaPrenotazione(int prenotazioneId) {
		// TODO Auto-generated method stub
		 Optional<Prenotazioni> prenotazioneOptional = dao.findById(prenotazioneId);

	        if (prenotazioneOptional.isPresent()) {
	            Prenotazioni prenotazione = prenotazioneOptional.get();
	            dao.delete(prenotazione); // 
	            return prenotazione; // 
	        } else {
	            
	            return new Prenotazioni();
	            }
	}
	
	
//	@Override
//	public Prenotazioni deletePrenotazione(int prenotazioneId) {
//		// TODO Auto-generated method stub
//		return dao.deleteById(prenotazioneId);
//	}
	
	

}
