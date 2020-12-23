import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CandidatService } from '../models/candidat.service';
import { Electeur } from '../models/electeur.model';
import { VoterService } from '../models/voter.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string
  post: any
  constructor(private formBuilder: FormBuilder, private voterService: VoterService) { }

  ngOnInit() {
    this.titleAlert = 'Ce champ est requis';
    this.post = ''
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'cin': [null, [Validators.required]],
      'nom_e': [null, Validators.required],
    });
  }

  get cin() {
    return this.formGroup.get('cin') as FormControl
  }
  get nom() {
    return this.formGroup.get('nom_e') as FormControl
  }


  onSubmit(post) {
    this.voterService.add(post).subscribe((d: Electeur) => {
      alert('ajouté avec succés.')
      this.ngOnInit()
    })
    post = {} as Electeur
  }

}
