import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarUsrComponent } from './components/sidebar-usr/sidebar-usr.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ActivComponent } from './components/activ/activ.component';
import { NotifComponent } from './components/notif/notif.component';
import { HomeUsrComponent } from './components/home-usr/home-usr.component';
import { CalUsrComponent } from './components/cal-usr/cal-usr.component';
import { RegisComponent } from './components/regis/regis.component';
import { CalComponent } from './components/cal/cal.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeAdmComponent } from './components/home-adm/home-adm.component';
import { SidebarAdmComponent } from './components/sidebar-adm/sidebar-adm.component';
import { RegisUsrComponent } from './components/regis-usr/regis-usr.component';
import { FechaEspPipe } from './pipes/fecha-esp.pipe';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ActivAdmComponent } from './components/activ-adm/activ-adm.component';
import { NotifAdmComponent } from './components/notif-adm/notif-adm.component';
import { MapService } from './map.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { ParticipantesComponent } from './components/participantes/participantes.component';
import { OneSignalModule } from 'ngx-onesignal';


@NgModule({ 
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarUsrComponent,
    HomeComponent,
    LoginComponent,
    ActivComponent,
    NotifComponent,
    HomeUsrComponent,
    CalUsrComponent,
    RegisComponent,
    CalComponent,
    HomeAdmComponent,
    SidebarAdmComponent,
    RegisUsrComponent,
    FechaEspPipe,
    CalendarioComponent,
    ActivAdmComponent,
    NotifAdmComponent,
    ParticipantesComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
    OneSignalModule.forRoot({
      appId: 'TU_APP_ID'
    })
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
