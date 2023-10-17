package it.pro.integration;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.pro.dto.LoginDTO;
import it.pro.entities.Evento;
import it.pro.entities.Utente;
import it.pro.response.LoginResponse;
import it.pro.services.EventoService;
import it.pro.services.UtenteService;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ControllerREST {
	
	@Autowired
	private EventoService eventoService;
	
	@Autowired
	private UtenteService utenteService;
	
	@GetMapping("evento")
	List<Evento> getEvento(){
		return eventoService.getAll();
	}
	
	@GetMapping("evento/{eventoID}")
	Evento getEventoById(@PathVariable int eventoID) {
//		if(eventoService.getEventoById(eventoID)!=null) {
			return eventoService.getEventoById(eventoID);
//		} return new Evento();
	}
	
	@GetMapping("utente")
	List<Utente> getUtente(){
		return utenteService.getAll();
	}
	
	@GetMapping("utente/{UserID}")
	Utente getUtenteById(@PathVariable String UserID) {
		Utente u = utenteService.getUtente(UserID);
		if(u!=null) {
			return u;
		} return new Utente();
	}
	
	@PostMapping("evento/utente/{utenteID}")
	Evento addEvento(@RequestBody Evento e, @PathVariable String utenteID) {
	Utente u =	utenteService.getUtente(utenteID);
	e.setUtente(u);
		return eventoService.add(e);
	}
	
	@PostMapping("utente/{id}")
	Utente addUtente(@RequestBody Utente u) {
		return utenteService.add(u);
	}
	
	@PostMapping("login")
	LoginResponse login(@RequestBody LoginDTO u) {
		Utente utente = utenteService.findByEmailAndPassword(u.getEmail(), u.getPassword());
		LoginResponse response;
		
		if ( utente == null) {
			response = new LoginResponse(utente, "ko");
		} else {
			response = new LoginResponse(utente, "ok");
		} 
		return response;
	}
	
	
	
	
	

}
