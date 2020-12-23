import { Component, OnInit } from '@angular/core';
import { Candidat } from '../models/candidat.model';
import { CandidatService } from '../models/candidat.service';
import { Electeur } from '../models/electeur.model';
import { VoterService } from '../models/voter.service';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.css']
})
export class VoterComponent implements OnInit {
  electeurs: Electeur[]
  selectedElecteur: Electeur
  candidats: Candidat[]
  displayedColumns: string[]
  choosenCandidat: Candidat
  constructor(private voterService: VoterService, private candidatService: CandidatService) { }

  ngOnInit() {
    this.electeurs = []
    this.selectedElecteur = {} as Electeur
    this.choosenCandidat = null
    this.displayedColumns = ['No', 'nom', 'prenom', 'date naissance', 'appartien parti', 'rang', 'actions'];
    this.candidats = []
    this.voterService.getAll().subscribe((electeurs: Electeur[]) => {
      this.electeurs = electeurs
    })
  }
  checkVoter() {
    if (!this.selectedElecteur.candidat_choisit) {
      this.choosenCandidat = null
      this.fetchCandidats();
    } else {
      this.choosenCandidat = this.selectedElecteur.candidat_choisit
    }
  }
  fetchCandidats() {
    this.candidatService.getAll().subscribe((d: Candidat[]) => {
      this.candidats = d
    })
  }
  choose(element) {
    this.choosenCandidat = element
  }
  cancelVote($event) {
    this.ngOnInit()
  }
}
