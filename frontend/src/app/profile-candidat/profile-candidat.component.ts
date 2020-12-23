import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Candidat } from '../models/candidat.model';
import { Electeur } from '../models/electeur.model';
import { VoterService } from '../models/voter.service';

@Component({
  selector: 'app-profile-candidat',
  templateUrl: './profile-candidat.component.html',
  styleUrls: ['./profile-candidat.component.css']
})
export class ProfileCandidatComponent implements OnInit {
  @Input('candidat')
  candidat: Candidat
  @Input('electeur')
  electeur: Electeur
  @Output('goBackAction')
  goback: EventEmitter<string> = new EventEmitter()
  constructor(private elecServ: VoterService) { }

  ngOnInit() {
  }
  vote() {
    if (confirm('êtes vous sur de faire ce choix?')) {
      this.elecServ.vote(this.candidat.code_C, this.electeur.ide).subscribe(x => {
        alert('vote enregistré!')
        this.goback.emit('cancel')
      })
    }

  }
  goBack() {
    this.elecServ.update(this.electeur).subscribe(x => {
      this.goback.emit('cancel')
    })
  }
}
