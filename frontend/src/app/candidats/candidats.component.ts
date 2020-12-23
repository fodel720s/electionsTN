import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Candidat } from '../models/candidat.model';
import { CandidatService } from '../models/candidat.service';
@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.css']
})

export class CandidatsComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string
  post: any
  ELEMENT_DATA: Candidat[]
  displayedColumns: string[]
  candidatToEdit: Candidat
  constructor(private formBuilder: FormBuilder, private candidatService: CandidatService) { }

  ngOnInit() {
    this.titleAlert = 'Ce champ est requis';
    this.post = ''
    this.candidatToEdit = null
    this.displayedColumns = ['No', 'nom', 'prenom', 'rang', 'actions'];
    this.ELEMENT_DATA = []
    this.createForm();
    this.setChangeValidate()
    this.fetchCandidats()
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'prenom': [null, [Validators.required]],
      'nom': [null, Validators.required],
      'birthday': [null, Validators.required],
      'rank_List': [null, Validators.required],
      'fb_link': [null, null],
      'twe_link': [null, null],
      'appartientpartie': ''
    });
  }
  fetchCandidats() {
    this.candidatService.getAll().subscribe((d: Candidat[]) => {
      this.ELEMENT_DATA = d
    })
  }
  setChangeValidate() {
    this.formGroup.get('appartientpartie').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('nom').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.formGroup.get('nom').setValidators(Validators.required);
        }
        this.formGroup.get('nom').updateValueAndValidity();
      }
    )
  }
  get twe_link() {
    return this.formGroup.get('twe_link') as FormControl
  }
  get fb_link() {
    return this.formGroup.get('fb_link') as FormControl
  }
  get rank_List() {
    return this.formGroup.get('rank_List') as FormControl
  }
  get nom() {
    return this.formGroup.get('nom') as FormControl
  }
  get prenom() {
    return this.formGroup.get('prenom') as FormControl
  }
  get birthday() {
    return this.formGroup.get('birthday') as FormControl
  }


  onSubmit(post) {
    if (this.candidatToEdit) {
      post.code_C = this.candidatToEdit.code_C
      this.candidatService.update(post).subscribe(() => this.ngOnInit())
    } else {
      this.candidatService.add(post).subscribe((d: Candidat) => this.ngOnInit())
    }
    this.candidatToEdit = null
    post = {} as Candidat
  }
  edit(elem: Candidat) {
    this.candidatToEdit = elem
    this.formGroup.get("nom").setValue(elem.nom)
    this.formGroup.get("prenom").setValue(elem.prenom)
    this.formGroup.get("birthday").setValue(elem.birthday)
    this.formGroup.get("rank_List").setValue(elem.rank_List)
    this.formGroup.get("fb_link").setValue(elem.fb_link)
    this.formGroup.get("twe_link").setValue(elem.twe_link)
    this.formGroup.get("appartientpartie").setValue(elem.appartientpartie)
  }
  delete(elem) {
    if (confirm('en êtes vous sur ?')) {
      this.candidatService.delete(elem.code_C).subscribe((d: Candidat) => this.ngOnInit())
    }
  }
}
