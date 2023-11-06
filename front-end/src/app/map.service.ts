import { Injectable } from '@angular/core';
import { google } from 'google-maps';
import { Subject, Observable } from 'rxjs';


declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: google.maps.Map | undefined;
  private directionsService = new google.maps.DirectionsService();
  private directionsRenderer = new google.maps.DirectionsRenderer();

  private clickSubject = new Subject<{ lat: number|undefined, lng: number|undefined }>();

  getMapClickEvent(): Observable<{ lat: number|undefined, lng: number|undefined }> {
    return this.clickSubject.asObservable();
  }

  private lat: number | undefined;
  private lng: number | undefined;
  private marcador!: google.maps.Marker;

  constructor() {}

  //#Mapdiv
  initMap(mapElement: HTMLElement, centerCoords: { lat: number; lng: number }, zoom=15, clickeable=false): void {
    this.map = new google.maps.Map(mapElement, {
      center: centerCoords,
      zoom: zoom,
    });
    if(clickeable){
      this.clickMap()
    }     
  }

  addMarker(coords: { lat: number |undefined; lng: number|undefined }|undefined, title: string, icon: String, anim?:google.maps.Animation): google.maps.Marker {
    let marker:any;
    
    if (this.map) {
        marker= new google.maps.Marker({
        position: coords,
        map: this.map,
        title: title,
        icon:{
          url:icon,
          scaledSize: new google.maps.Size(30, 30)
        },
        animation:anim
      });
    }
    return marker; 
  }

  drawRoute(coords1: { lat: number; lng: number }, coords2: { lat: number; lng: number }): void {
    if (this.map) {
      const originMarker = new google.maps.Marker({
        position: coords1,
        map: this.map,
        icon: {
          url: '../assets/person-solid.svg',
          scaledSize: new google.maps.Size(30, 30)
        }
      });
      const request = {
        origin: coords1,
        destination: coords2,
        travelMode: google.maps.TravelMode.WALKING,
      };
      this.directionsService.route(request, (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
        if (status === 'OK') {
          const directionsRenderer = new google.maps.DirectionsRenderer({
            map: this.map,
            directions: result,
            suppressMarkers: true // Ocultar los marcadores de inicio y fin de la ruta generados automáticamente
          });
          directionsRenderer.setMarkerOptions({
            origin: {
              icon: {
                url: '../assets/person-solid.svg',
                scaledSize: new google.maps.Size(30, 30)
              }
            }
          });
          this.directionsRenderer.setMap(this.map);
          this.directionsRenderer.setDirections(result);
        } else {
          console.error('Error al obtener direcciones:', status);
        }
      });
    }
  }

  

  clickMap(){
    let coords;
    this.map?.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event) {
        const latLng = event.latLng;
        const lat=latLng?.lat()
        const lng=latLng?.lng()
        coords={lat: lat,lng:lng}
        console.log(this.lat)
        console.log(this.lng)

        this.clickSubject.next({ lat, lng });
        
        
        this.marcador.setPosition(latLng);
        if(this.marcador.getTitle()=='point'){
          this.marcador.setPosition(latLng);
          console.log(this.marcador.getTitle())
        }  
           // Eliminar el marcador del mapa si exise
      }
    });
    this.marcador=this.addMarker(coords,'point','../assets/flag-solid copy.svg')
  }

  addMarker2(coords1: { lat: number|undefined; lng: number|undefined }): google.maps.Marker {
    const marcador=new google.maps.Marker({
      position: coords1,
      map: this.map,
      title: 'Mi Marcador'
    });
    return marcador;
  }
  
  
}
