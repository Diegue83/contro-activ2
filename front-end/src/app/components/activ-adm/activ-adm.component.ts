import { Actividad } from 'src/app/models/actividades';
import { ActividadesService } from 'src/app/services/actividades.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { LugaresService } from 'src/app/services/lugares.service';
import { MapService } from 'src/app/map.service';
import { Lugar } from 'src/app/models/lugares';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-activ-adm',
  templateUrl: './activ-adm.component.html',
  styleUrls: ['./activ-adm.component.css'],
})
export class ActivAdmComponent implements OnInit {
  @ViewChild('locSelect', { static: false }) locSelect!: ElementRef;

  latitud: number | undefined;
  longitud: number | undefined;
  userLocation= {
    lat: 21.16738334946337,
    lng: -100.93094830464078
  };
  coords: { lat: number | undefined; lng: number | undefined; } | undefined;
  userRoles: any;
  userInfo:User[]=[]
  

  constructor(
    public actividadService: ActividadesService,
    public userService: UsersService,
    public lugaresService: LugaresService,
    private mapService: MapService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAct();
    this.getUsr();
    this.getLugar();
    this.getLocation();
    navigator.geolocation.getCurrentPosition((position) => {
      this.userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.showMap();
    });
    this.authService.getRol().subscribe((rol) => {
      this.userInfo = rol;
    });
  }

  getLugar() {
    this.lugaresService.getLug().subscribe(
      (res) => {
        this.lugaresService.lugares = res;
        console.log(res);
      },
      (error) => console.error()
    );
     
  }

  getUsr() {
    this.userService.getUsr().subscribe(
      (res) => {
        this.userService.users = res;
        console.log(res);
      },
      (error) => console.log(error)
    );
  }

  getAct() {
    this.actividadService.getAct().subscribe(
      (res) => {
        this.actividadService.actividades = res;
        console.log(res);
        
      },
      (error) => console.log(error)
    );
  }
  getActEnded() {
    this.actividadService.getActEnded().subscribe(
      (res) => {
        this.actividadService.actividades = res;
        console.log(res);
        
      },
      (error) => console.log(error)
    );
  }

  getByUsrAct(idUsr:any) {
    this.actividadService.getByUsrAct(idUsr).subscribe(
      (res) => {
        this.actividadService.actividades = res;
        console.log(res);
      },
      (error) => console.log(error)
    );
  }
  
  insAct(form: NgForm) {
    const actividad: Actividad={
      fecha:form.value.fecha,
      nomAct:form.value.nomAct,
      idLug:form.value.idLug,
      idUsr:form.value.idUsr,
      descripcion:form.value.descripcion
    }
    
    if (form.value.idAct && form.value.idAct !== 0) {
      const resp = confirm('¿Guardar Cambios?');
      console.log('Actualizando');
      this.actividadService.updAct(actividad).subscribe(
        (res) => console.log(res),
        (error) => console.log(error)
      );
    } else {
      this.actividadService.insAct(actividad).subscribe(
        (res) => {
          this.getAct();
          form.reset();
        },
        (err) => console.log(err)
      );
    }
  }
  updAct(actividad: Actividad) {
    this.actividadService.actividad = actividad;
  }

  delAct(id: any) {
    const resp = confirm('¿Estas seguro de eliminar esta actividad?');
    console.log('eliminando');
    if (resp) {
      this.actividadService.delAct(id).subscribe(
        (res) => {
          this.getAct();
        },
        (err) => console.log(err)
      );
    }
  }

  getLocation() {
    this.mapService
      .getMapClickEvent()
      .subscribe(
        (coords: { lat: number | undefined; lng: number | undefined }) => {
          if (coords) {
            // Aquí puedes utilizar las coordenadas (coords.lat y coords.lng) como desees
            console.log('Coordenadas obtenidas:', coords.lat, coords.lng);
            // Puedes guardar las coordenadas en una variable local si lo necesitas
            this.latitud = coords.lat;
            this.longitud = coords.lng;
            console.log(coords);
            this.coords=coords
          }
        }
      );
  }

  nuevaOp: Lugar={
    idLug: 0,
    nomLug: 'Nuevo Lugar'
  }

  agNuevoLug(form: NgForm) {
    const lugar: Lugar = {
      nomLug: form.value.nomLug,
      latitud: this.coords?.lat,
      longitud: this.coords?.lng,
    };
    console.log(lugar)
  
    this.lugaresService.agNuevoLug(lugar).subscribe(
      (nuevoLugar) => {
        this.getLugar()
      },
      (err) => console.log(err)
    );
    this.getLugar()
    this.nuevaOp=lugar
    this.nuevaOp.idLug=this.lugaresService.lugares.length+1
  }

  formReset(form: NgForm) {
    this.actividadService.actividad = form.value;
    form.reset();
  }

  showMap(){
      const mapElement = this.locSelect.nativeElement;
      this.mapService.initMap(mapElement, this.userLocation, 30,true); // Utiliza el método del servicio
      console.log("hecho")
  }

  mapaVisble=false;
  mapBox(op: number){
    if(op==0){
      this.mapaVisble=true;
      this.showMap()

      console.log('esta pasandaaa')
    }else{
      this.mapaVisble=false;
    }
    console.log('mapa')
  }

  visible: boolean = false;
  oculto: boolean = true;
  alerta: boolean = true;

  mostrar() {
    if (this.visible) {
      this.visible = false;
      this.alerta = false;

    } else {
      this.visible = true;
    }
    this.nuevaOp={
      idLug: 0,
      nomLug: 'Nuevo Lugar'
    }
  }
  Ocultar() {
    if (this.oculto) {
      this.oculto = false;
    } else {
      this.oculto = true;
    }
  }

  Alerta() {
    if (this.alerta) {
      this.alerta = false;
    } else {
      this.alerta = true;
    }
  }

  nuevo:boolean=false;

  selectNew(){
    this.nuevo=true
    console.log('hi')
  }
  
  option=0;
  resetTable(option: any){
    console.log(option)
    const userId=this.userInfo[0].idUsr
    option = parseInt(option);
    console.log(option)
    switch (option){
      case 0:
        this.getAct()
        this.oculto=true
        break;
      case 1:
        console.log(option)
        this.getByUsrAct(userId)
        this.oculto=false
        break;
      case 3:
        this.getActEnded()
        this.oculto=false
        break;
        
    }
  }
}
