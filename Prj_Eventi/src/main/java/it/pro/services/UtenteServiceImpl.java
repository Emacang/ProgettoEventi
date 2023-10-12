package it.pro.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.pro.entities.Utente;
import it.pro.repos.UtenteDAO;

@Service
public class UtenteServiceImpl implements UtenteService {
	
	@Autowired
	UtenteDAO dao;

	@Override
	public List<Utente> getAll() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public Utente getUtente(String UserID) {
		// TODO Auto-generated method stub
		return dao.getReferenceById(UserID);
	}

	@Override
	public Utente add(Utente u) {
		// TODO Auto-generated method stub
		return dao.save(u);
	}

}