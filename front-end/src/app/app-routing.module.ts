import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ActivComponent } from './components/activ/activ.component';
import { NotifComponent } from './components/notif/notif.component';
import { HomeUsrComponent } from './components/home-usr/home-usr.component';
import { CalUsrComponent } from './components/cal-usr/cal-usr.component';
import { LoginComponent } from './components/login/login.component';
import { RegisComponent } from './components/regis/regis.component';
import { CalComponent } from './components/cal/cal.component';
import { HomeAdmComponent } from './components/home-adm/home-adm.component';
import { RegisUsrComponent } from './components/regis-usr/regis-usr.component';
import { ActivAdmComponent } from './components/activ-adm/activ-adm.component';
import { NotifAdmComponent } from './components/notif-adm/notif-adm.component';
import { ParticipantesComponent } from './components/participantes/participantes.component';

const routes: Routes = [
  {
    path: '', 
    component:HomeComponent},
  {
    path: 'home', 
    component:HomeComponent},
  {
    path: 'home-usr', 
    component:HomeUsrComponent},
  {
    path: 'login', 
    component:LoginComponent},
  {path: 'regis', 
  component:RegisComponent},
  {path: 'cal', 
  component:CalComponent},
  {path: 'cal-usr', component:CalUsrComponent},
  {path: 'activ', component:ActivComponent},
  {path: 'notif', component:NotifComponent},
  {path: 'home-adm', component:HomeAdmComponent},
  {path: 'regis-usr', component:RegisUsrComponent},
  {path: 'activ-adm', component:ActivAdmComponent},
  {path: 'notif-adm', component:NotifAdmComponent},
  {path: 'participantes',component:ParticipantesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
