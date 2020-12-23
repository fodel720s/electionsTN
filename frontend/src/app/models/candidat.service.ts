import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  baseUrl: string = environment.baseUrl + "/Candidat"
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(this.baseUrl + "/all");
  }
  add(candidat) {
    return this.http.post(this.baseUrl + "/newCandidat", candidat);
  }
  update(candidat) {
    return this.http.put(this.baseUrl + "/edit/2", candidat);
  }
  find(id) {
    return this.http.get(this.baseUrl + "/Candidat/" + id);
  }
  delete(id) {
    return this.http.delete(this.baseUrl + "/deleteCandidat/" + id);
  }
}
