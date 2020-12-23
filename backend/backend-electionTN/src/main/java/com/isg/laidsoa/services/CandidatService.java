package com.isg.laidsoa.services;

import com.isg.laidsoa.entities.Candidat;
import com.isg.laidsoa.repositories.CandidatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.Collection;
import java.util.Optional;

@Service

public class CandidatService {

	@Autowired
	private CandidatRepository CRepos;


	public CandidatService(CandidatRepository CANRepos) {
		this.CRepos = CANRepos;
	}

	public ResponseEntity<Candidat> addCandidat(Candidat c1)
	{
		Optional<Candidat> candidat = CRepos.findByNomEtPrenomEtMdp(c1.getNom(),c1.getPrenom());
		if(candidat.isPresent())
			new ResponseEntity(HttpStatus.BAD_REQUEST);
		Candidat candidat1=CRepos.save(c1);
		return new ResponseEntity(candidat1,HttpStatus.CREATED);
	}
	public ResponseEntity<Candidat> edit(Candidat c1)
	{
		Optional<Candidat> candidat = CRepos.findById(c1.getCode_C());
		if(!candidat.isPresent()) {		
			new ResponseEntity(HttpStatus.BAD_REQUEST);  

		}
		Candidat candidat1 = new Candidat();
		candidat1.setCode_C(c1.getCode_C());
		candidat1.setAppartientpartie(c1.isAppartientpartie());
		candidat1.setBirthday(c1.getBirthday());
		candidat1.setFb_link(c1.getFb_link());
		candidat1.setNom(c1.getNom());
		candidat1.setPrenom(c1.getPrenom());
		candidat1.setRank_List(c1.getRank_List());
		candidat1.setTwe_link(c1.getRank_List());
		candidat1.setTypelist(c1.getTypelist());
		return    new ResponseEntity(CRepos.save(candidat1),HttpStatus.OK);
	}

	public ResponseEntity<Collection<Candidat>> getAllCandidat()
	{
		Collection<Candidat> lst1=CRepos.findAll();
		if(lst1.isEmpty())
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		return new ResponseEntity(lst1,HttpStatus.OK);
	}



	public ResponseEntity<?> getCandidatById(Long id)
	{
		Optional<Candidat> candidat=CRepos.findById(id);

		return candidat.map(x->ResponseEntity.ok().body(x))
				.orElse(new ResponseEntity(HttpStatus.NOT_FOUND));
	}


	public ResponseEntity deleteCandidat(Long id)
	{
		Optional<Candidat> candidat=CRepos.findById(id);
		if(candidat.isEmpty())
			new ResponseEntity<>(HttpStatus.NOT_FOUND);
		CRepos.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);

	}











}
