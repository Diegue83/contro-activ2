import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class NotifActService {

  constructor() { // Programa la tarea para ejecutarse cada 24 horas
    interval(0.1 * 60 * 60 * 1000) // 24 horas en milisegundos
      .pipe(take(1)) // Ejecuta la tarea solo una vez
      .subscribe(() => {
        this.checkUpcomingEvents();
      }); 
    }

    private checkUpcomingEvents() {
      const event = {}; // Datos del evento a enviar en la notificación

    // Envía una notificación a un token específico (puedes personalizar según tus necesidades)
    this.messaging.requestToken.subscribe((token) => {
      this.messaging
        .requestPermission()
        .then(() => {
          this.messaging
            .sendMessage({
              to: token,
              notification: {
                title: 'Evento cercano',
                body: 'Un evento cercano se acerca',
              },
              data: event, // Datos personalizados del evento
            })
            .then(() => {
              console.log('Notificación enviada con éxito');
            })
            .catch((error) => {
              console.error('Error al enviar la notificación:', error);
            });
        })
        .catch((error) => {
          console.error('Permiso denegado:', error);
        });
    });
  }


}
