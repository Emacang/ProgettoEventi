package it.pro.presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import it.pro.services.EventoService;
import it.pro.services.UtenteService;

@Controller
@RequestMapping
public class MVCCtrl {

	@Autowired
	private EventoService eventoService;
	
	@Autowired
	private UtenteService utenteService;
}
