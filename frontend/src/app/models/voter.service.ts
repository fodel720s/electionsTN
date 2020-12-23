import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VoterService {
    baseUrl: string = environment.baseUrl + "/Electeur"
    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get(this.baseUrl + "/all");
    }
    add(obj) {
        return this.http.post(this.baseUrl + "/newElecteur", obj);
    }
    update(obj) {
        return this.http.put(this.baseUrl + "/Electeur/" + obj.ide, obj);
    }
    find(id) {
        return this.http.get(this.baseUrl + "/Electeur/" + id);
    }
    vote(idcandidat, idelecteur) {
        return this.http.get(this.baseUrl + "/voter/" + idelecteur + "/" + idcandidat);
    }
    delete(id) {
        return this.http.delete(this.baseUrl + "/deleteElecteur/" + id);
    }
}
