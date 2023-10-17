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
		return dao.findByUserID(UserID);
	}

	@Override
	public Utente add(Utente u) {
		// TODO Auto-generated method stub
		return dao.save(u);
	}

	@Override
	public Utente findByEmailAndPassword(String email, String password) {
		// TODO Auto-generated method stub
		return dao.findByEmailAndPassword(email, password);
	}

}
