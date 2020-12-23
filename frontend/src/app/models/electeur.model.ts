import { Candidat } from './candidat.model';

export interface Electeur {
    ide: number
    nom_e: string
    cin: string
    candidat_choisit: Candidat
}