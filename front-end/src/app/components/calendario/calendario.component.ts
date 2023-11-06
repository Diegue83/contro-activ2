import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import { ActividadesService } from 'src/app/services/actividades.service';
import { Actividad } from 'src/app/models/actividades';
import { MapService } from 'src/app/map.service';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  eventInfoVisible: boolean = false;
  selectedEvent: any;
  

  week: any = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ];

  eventos: Actividad[] = [];
  monthSelect: any[] = [];
  dateSelect: any;
  dateValue: any = new Date();
  userLocation= {
    lat: 21.16738334946337,
    lng: -100.93094830464078
  };
  distancia: number = 0;


  constructor(private actividadService: ActividadesService, private mapService: MapService) {}

  ngOnInit(): void {
    const fechaActual = new Date();
    const mes = fechaActual.getMonth();
    const año = fechaActual.getFullYear();
    this.getDaysFromDate(mes + 1, año);
    this.getEventos();
    navigator.geolocation.getCurrentPosition((position) => {
      this.userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    });
    console.log(this.userLocation)
  }

  ngAfterViewInit() {
    // Este método se ejecutará después de que la vista se haya inicializado
    // Puedes usar mapContainer de forma segura aquí
  }

  getEventos(): void {
    this.actividadService.getAct().subscribe(
      (res: Actividad[]) => {
        this.eventos = res;
        console.log(this.eventos);
      },
      (error) => console.log(error)
    );
  }

  hasEvent(day: any): boolean {
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day?.value.toString().padStart(2, '0')}`;
    return this.eventos.some((evento) => evento.fecha.startsWith(parse));
  }

  hoy(day: any): boolean {
    const hoy = new Date();
    hoy.setDate(hoy.getDate());
    const diaStr = hoy.toISOString().slice(0, 10);
    const dia = `${diaStr}`;
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day?.value.toString().padStart(2, '0')}`;

    if (dia === parse) {
      return true;
    }
    return false;
  }

  getDaysFromDate(month: number, year: number) {
    const startDate = moment.utc(`${year}/${month}/02`);
    const endDate = startDate.clone().endOf('month');
    console.log(endDate)
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays+1);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a +1}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day: { value: any }) {
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value.toString().padStart(2, '0')}`;
    const objectDate = moment(parse);
    this.dateValue = objectDate;
    console.log(parse);

    const eventosDia = this.eventos.filter((evento) =>
      moment(evento.fecha).isSame(objectDate, 'day')
    );

    if (eventosDia.length > 0) {
      this.eventInfoVisible = true;
      this.selectedEvent = eventosDia[0];

      const coordenadas = {
        lat: this.selectedEvent.latitud,
        lng: this.selectedEvent.longitud
      }

      this.mostrarMinimapa(coordenadas, this.selectedEvent.nomAct);
      this.ruta(this.userLocation, coordenadas)
      
    } else {
      this.eventInfoVisible = false;
    }

    console.log(day);
  }


  mostrarMinimapa(coordenadas: { lat: number; lng: number }, nombre: string) {
    const mapElement = this.mapContainer.nativeElement;
  
    if (mapElement) {
      this.mapService.initMap(mapElement, coordenadas); // Utiliza el método del servicio
      this.mapService.addMarker(coordenadas, nombre, '../assets/thumbtack-solid.svg',google.maps.Animation.DROP);
      this.mapService.addMarker(this.userLocation, 'Mi ubicación','../assets/person-solid.svg');
      this.distancia = parseFloat(this.calcularDistancia(this.userLocation, coordenadas).toFixed(2));
      
    }
  }

  ruta(coords1: { lat: number; lng: number }, coords2: { lat: number; lng: number }) {
    this.mapService.drawRoute(coords1, coords2); // Utiliza el método del servicio
  }
  
  

  cerrarInfoEvent() {
    this.eventInfoVisible = !this.eventInfoVisible;
  }

  calcularDistancia(coords1: { lat: number; lng: number }, coords2: { lat: number; lng: number }): number {
    const radlat1 = Math.PI * coords1.lat / 180;
    const radlat2 = Math.PI * coords2.lat / 180;
    const theta = coords1.lng - coords2.lng;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  }
}
