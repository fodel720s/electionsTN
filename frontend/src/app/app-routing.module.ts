import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatsComponent } from './candidats/candidats.component';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { VoterComponent } from './voter/voter.component';

const routes: Routes = [
  { path: 'candidats', component: CandidatsComponent },
  { path: 'voter', component: VoterComponent },
  { path: 'inscription-vote', component: InscriptionComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
